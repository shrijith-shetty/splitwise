import * as readline from "node:readline";
import { ask } from "./ask.js";
import { updateFriend } from "./updateFriend.js";
import { searchResults } from "../controller/search_result/search_result.control.js";
import { tablePrint } from "./print-Table_friend.js";
export const updateSearchFriend = async (search_Method, rl) => {
    let result;
    if (search_Method === "1") {
        const phone_numb = await ask("Enter the phone number to Search\n", rl);
        result = await searchResults(phone_numb);
        if (result.length === 0) {
            console.log("Not found...");
            return;
        }
    }
    else {
        const email = await ask("Enter the email to search\n", rl);
        result = await searchResults(email);
        if (result.length === 0) {
            console.log("Not found...");
            return;
        }
    }
    await tablePrint(result);
    rl.question("Enter the index to search: ", (inputValue) => {
        const index = Number(inputValue);
        if (isNaN(index)) {
            console.log("Invalid index");
        }
        else {
            // console.log("Index is:", index);
            updateFriend(index, rl);
        }
    });
};
//# sourceMappingURL=update-serch-friend.js.map