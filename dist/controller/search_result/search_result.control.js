import { getFriends } from "../../repository/getUserDetail/fetch_data.js";
import { tablePrint } from "../../presentation/print-Table_friend.js";
export let searchFriends;
export const searchResults = async (input) => {
    const data = await getFriends();
    const cleanInput = input.toLowerCase().trim();
    searchFriends = data.filter((e) => !e.isDeleted &&
        e.name.toLowerCase().trim().includes(cleanInput) |
            e.email.toLowerCase().trim().includes(cleanInput) |
            e.phone.toLowerCase().trim().includes(cleanInput));
    // tablePrint(searchFriends);
    return searchFriends;
};
//# sourceMappingURL=search_result.control.js.map