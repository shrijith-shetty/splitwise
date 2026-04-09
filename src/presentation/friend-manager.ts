import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { addFriend } from "./addingFriends.js";
import { searchFriend } from "./search-friend.js";
import { ask } from "./ask.js";
import { updateSearchFriend } from "./update-serch-friend.js";
import { choose } from "./choice.js";
import { options } from "./user_option.js";
import { searchResults } from "../core/search_result/search_result.control.js";
import { tablePrint } from "./print_table.js";
import { getFriends } from "../repository/getUserDetail/fetch_data.js";
import type { Friend } from "../model/friend.js";
import { promises as fs } from "node:fs";

const rl = readline.createInterface({ input, output });

export const manageFriends = async () => {
  while (true) {
    console.log();
    for (let i = 0; i < options.length; i++) {
      console.log(options[i]?.value + ". " + options[i]?.label);
    }
    console.log("");
    let choice = await choose("what do you want to do?", rl);

    if (!choice) {
      console.log("Exiting...");
      break;
    }

    switch (choice) {
      case "1":
        console.log("Adding friend...");
        await addFriend(rl);
        break;

      case "2":
        console.log("Searching friend...");
        const searchingMethod: string = await choose(
          "1. Search by name\n2. Search By Email\n",
          rl,
        );
        if (!searchingMethod) return;
        await searchFriend(searchingMethod, rl);
        break;

      case "3":
        console.log("Updating friend...");
        const freindDetail: string = await choose(
          "\n1. Search by phone number\n2. Search By Email\n",
          rl,
        );
        if (!freindDetail) return;
        await updateSearchFriend(freindDetail, rl);
        break;

      case "4":
        {
          console.log("Delete friend...");

          const deleteFriend: string = await choose(
            "1. Delete by name\n2. Delete By Email\n",
            rl,
          );

          if (!deleteFriend) break;

          let result: Friend[] = [];

          if (deleteFriend === "1") {
            const input = (await ask("Enter the name to delete\n", rl)).trim();
            result = await searchResults(input);
          } else {
            const input = (await ask("Enter the email to delete\n", rl)).trim();
            result = await searchResults(input);
          }

          if (!result || result.length === 0) {
            console.log("No matching records found");
            break;
          }

          tablePrint(result);

          const index = await new Promise<number>((resolve) => {
            rl.question("Enter the index value to delete: ", (answer) => {
              const indexValue = Number(answer);
              if (!isNaN(indexValue)) {
                resolve(indexValue);
              } else {
                console.log("Invalid input");
                resolve(-1);
              }
            });
          });

          const realIndex = index - 1;

          if (realIndex < 0 || realIndex >= result.length) {
            console.log("Invalid index");
            break;
          }

          if (Number(result[realIndex]?.balance) !== 0) {
            console.log("Can't delete. Balance is not zero.");
            break;
          }

          const selectedFriend = result[realIndex];
          const id = selectedFriend?.id;

          console.log("\nSelected Friend:");
          console.log(selectedFriend);

          const validation = await new Promise<string>((resolve) => {
            rl.question(
              "Do you want to delete the friend (y/n): ",
              (answer) => {
                resolve(answer);
              },
            );
          });

          if (validation.trim().toLowerCase() === "y") {
            const friendDetail = await getFriends();

            const deleteIndex = friendDetail.findIndex(
              (d: Friend) => d.id === id,
            );

            if (deleteIndex !== -1) {
              friendDetail[deleteIndex].isDeleted = true;

              await fs.writeFile(
                "./data/friend.json",
                JSON.stringify(friendDetail, null, 2),
              );

              console.log("Deleted successfully");
            } else {
              console.log("Friend not found");
            }
          } else {
            console.log("Deletion cancelled");
          }
        }
        break;
      case "5": {
        const friend = await getFriends();
        tablePrint(friend);
        break;
      }
      case "6":
        console.clear();
        return;
      case "7":
        console.log("Exiting...!");
        rl.close();
        break;
      default:
        console.log("\nInvalid choice. Please try again.");
    }
  }
};
