import * as readline from "node:readline";
// import promises = require("node:readline/promises");
import { stdin as input, stdout as output } from "node:process";
import { addFriend } from "./addingFriends.js";
import { searchFriend } from "./search-friend.js";
import { ask } from "./request.js";
import { deleteFriendByEmail, deleteFriendByName } from "./delete_friend.js";
import { updateSearchFriend } from "./update-serch-friend.js";
const options = [
    { label: "Add Friend", value: "1" },
    { label: "Search Friend", value: "2" },
    { label: "Update Friend", value: "3" },
    { label: "Delete Friend", value: "4" },
    { label: "Exit", value: "5" },
];
const rl = readline.createInterface({ input, output });
const choose = (question) => {
    return new Promise((resolve) => {
        rl.question(question + " ", resolve);
    });
};
export const manageFriends = async () => {
    while (true) {
        for (let i = 0; i < options.length; i++) {
            console.log(options[i]?.value + " " + options[i]?.label);
        }
        console.log("\n");
        let choice = await choose("what do you want to do?");
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
                const searchingMethod = await choose("1. Search by name\n2. Search By Email\n");
                if (!searchingMethod)
                    return;
                searchFriend(searchingMethod, rl);
                break;
            case "3":
                console.log("Updating friend...");
                const freindDetail = await choose("1. Search by name\n2. Search By Email\n");
                if (!freindDetail)
                    return;
                updateSearchFriend(freindDetail, rl);
                break;
            case "4":
                console.log("Delete friend...");
                const deleteFriend = await choose("1. Delete by name\n2. Delete By Email\n");
                if (!deleteFriend)
                    return;
                if (deleteFriend === "1") {
                    const input = await ask("Enter the name to delete\n", rl);
                    deleteFriendByName(input);
                }
                else {
                    const input = await ask("Enter the email to delete\n", rl);
                    deleteFriendByEmail(input);
                }
                break;
            case "5":
                console.log("Exiting...");
                rl.close();
                return;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }
};
//# sourceMappingURL=friend-manager.js.map