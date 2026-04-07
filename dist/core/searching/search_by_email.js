import { getFriends } from "../getUserDetail/fetch_data.js";
export const searchByEmail = async (email) => {
    const friends = await getFriends();
    return friends.findIndex((a) => a.email.toLowerCase() === email.toLowerCase() && !a.isDeleted);
};
//# sourceMappingURL=search_by_email.js.map