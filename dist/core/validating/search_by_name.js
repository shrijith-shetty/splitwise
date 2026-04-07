import { getFriends } from "../getUserDetail/fetch_data.js";
export const searchByName = async (name) => {
    const friends = await getFriends();
    return friends.findIndex((a) => a.name.toLowerCase() === name.toLowerCase() && !a.isDeleted);
};
//# sourceMappingURL=search_by_name.js.map