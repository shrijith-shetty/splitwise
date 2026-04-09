import * as readline from "node:readline";
import { ask } from "./ask.js";
import { updateFriend } from "./updateFriend.js";
import { searchResults } from "../controller/search_result/search_result.control.js";
import { tablePrint } from "./print_table.js";
export const updateSearchFriend = async (search_Method, rl) => {
    let result;
    if (search_Method === "1") {
        const phone_numb = await ask("Enter the phone number to Search\n", rl);
        result = await searchResults(phone_numb);
    }
    else {
        const email = await ask("Enter the email to search\n", rl);
        result = await searchResults(email);
    }
    if (result.length === 0) {
        console.log("Not found...");
        return;
    }
    await tablePrint(result);
    const inputValue = await ask("Enter the index to update: ", rl);
    const displayIndex = Number(inputValue);
    if (!Number.isInteger(displayIndex)) {
        console.log("Invalid index");
        return;
    }
    // If your table shows 1..N, convert to 0..N-1
    const index = displayIndex - 1;
    if (index < 0 || index >= result.length) {
        console.log("Index out of range");
        return;
    }
    await updateFriend(index, rl);
};
//# sourceMappingURL=update-serch-friend.js.map