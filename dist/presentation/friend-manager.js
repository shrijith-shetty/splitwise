import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { addFriend } from "./addingFriends.js";
import { searchFriend } from "./search-friend.js";
import { ask } from "./ask.js";
import { FILE_PATH } from "../core/filt_path.core.js";
import { updateSearchFriend } from "./update-serch-friend.js";
import { choose } from "../controller/choice.js";
import { options } from "./user_option.js";
import { searchResults } from "../controller/search_result/search_result.control.js";
import { tablePrint } from "./print-Table_friend.js";
import { getFriends } from "../repository/getUserDetail/fetch_data.js";
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
                const searchingMethod = await choose("1. Search by name\n2. Search By Email\n", rl);
                if (!searchingMethod)
                    return;
                await searchFriend(searchingMethod, rl);
                break;
            case "3":
                console.log("Updating friend...");
                const freindDetail = await choose("\n1. Search by phone number\n2. Search By Email\n", rl);
                if (!freindDetail)
                    return;
                await updateSearchFriend(freindDetail, rl);
                break;
            case "4":
                {
                    console.log("Delete friend...");
                    const deleteFriend = await choose("1. Delete by name\n2. Delete By Email\n", rl);
                    if (!deleteFriend)
                        return;
                    let result;
                    if (deleteFriend === "1") {
                        const input = await ask("Enter the name to delete\n", rl);
                        result = await searchResults(input);
                    }
                    else {
                        const input = await ask("Enter the email to delete\n", rl);
                        result = await searchResults(input);
                    }
                    tablePrint(result);
                    const index = await new Promise((resolve) => {
                        rl.question("Enter the index value to delete: ", (answer) => {
                            const indexValue = Number(answer);
                            if (!isNaN(indexValue)) {
                                resolve(indexValue);
                            }
                            else {
                                console.log("Invalid input");
                                resolve(-1);
                            }
                        });
                    });
                    if (index < 0 || index > result.length) {
                        console.log("Invalid index");
                        return;
                    }
                    if (result[index]?.balance !== "0") {
                        console.log("Can't delete ");
                        return;
                    }
                    const id = result[index]?.id;
                    const validation = await new Promise((resolve) => {
                        rl.question("Do you want to delete the freind (y): ", (answer) => {
                            resolve(answer);
                        });
                    });
                    if (validation.toLowerCase() === "y") {
                        const friendDetail = await getFriends();
                        const index = friendDetail.findIndex((d) => d.id === id);
                        if (index !== -1) {
                            friendDetail[index].isDeleted = true;
                            await fs.writeFile("./data/friend.json", JSON.stringify(friendDetail, null, 2));
                            console.log("Deleted successfully");
                        }
                        else {
                            console.log("Friend not found");
                        }
                    }
                    else {
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
                console.log("Exiting...");
                rl.close();
                return;
            default:
                console.log("\nInvalid choice. Please try again.");
        }
    }
};
//# sourceMappingURL=friend-manager.js.map