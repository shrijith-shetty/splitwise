import { getFriends } from "./core/getUserDetail/fetch_data.js";
import { manageFriends } from "./presentation/friend-manager.js";
import { searchResults, tablePrint, } from "./control/search_result/search_result.control.js";
async function run() {
    await searchResults("a");
    await tablePrint();
}
run();
//# sourceMappingURL=index.js.map