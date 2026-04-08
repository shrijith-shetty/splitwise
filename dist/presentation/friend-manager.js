import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { addFriend } from "./addingFriends.js";
import { searchFriend } from "./search-friend.js";
import { ask } from "./ask.js";
import { deleteFriendByEmail, deleteFriendByName } from "./delete_friend.js";
import { updateSearchFriend } from "./update-serch-friend.js";
import { choose } from "../controller/choice.js";
import { options } from "./user_option.js";
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
                console.log("Delete friend...");
                const deleteFriend = await choose("1. Delete by name\n2. Delete By Email\n", rl);
                if (!deleteFriend)
                    return;
                if (deleteFriend === "1") {
                    const input = await ask("Enter the name to delete\n", rl);
                    await deleteFriendByName(input);
                }
                else {
                    const input = await ask("Enter the email to delete\n", rl);
                    await deleteFriendByEmail(input);
                }
                break;
            case "5":
                console.log("Exiting...");
                rl.close();
                return;
            default:
                console.log("\nInvalid choice. Please try again.");
        }
    }
};
//# sourceMappingURL=friend-manager.js.map