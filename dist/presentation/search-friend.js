import * as readline from "node:readline";
import { ask } from "./ask.js";
import { getFriends } from "../repository/getUserDetail/fetch_data.js";
import { searchResults } from "../controller/search_result/search_result.control.js";
import { tablePrint } from "./print_table.js";
// import {}
export const searchFriend = async (search_Method, rl) => {
    let nameOrEmail = "";
    if (search_Method === "1") {
        nameOrEmail = await ask("Enter the name to Search\n", rl);
    }
    else {
        nameOrEmail = await ask("Enter the email to search\n", rl);
    }
    const result = await searchResults(nameOrEmail);
    if (!result) {
        console.log("Not found...");
        return;
    }
    tablePrint(result);
    return;
};
//# sourceMappingURL=search-friend.js.map