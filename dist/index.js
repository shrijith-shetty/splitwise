import { getFriends } from "./core/getUserDetail/fetch_data.js";
import { manageFriends } from "./presentation/friend-manager.js";
import { searchResults } from "./control/search_result/search_result.control.js";
async function run() {
    await manageFriends();
}
run();
//# sourceMappingURL=index.js.map