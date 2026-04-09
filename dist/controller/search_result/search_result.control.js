import { getFriends } from "../../repository/getUserDetail/fetch_data.js";
export let searchFriends;
export const searchResults = async (input) => {
    const data = await getFriends();
    const cleanInput = input.toLowerCase().trim();
    searchFriends = data.filter((e) => {
        const matches = e.name.toLowerCase().trim().includes(cleanInput) ||
            e.email.toLowerCase().trim().includes(cleanInput) ||
            e.phone.toLowerCase().trim().includes(cleanInput);
        return !e.isDeleted && matches;
    });
    return searchFriends;
};
//# sourceMappingURL=search_result.control.js.map