import { getFriends } from "../getUserDetail/fetch_data.js";
export const searchByPhoneNumber = async (phone) => {
    const friends = await getFriends();
    return friends.findIndex((a) => a.phone.toLowerCase() === phone.toLowerCase() && !a.isDeleted);
};
//# sourceMappingURL=search_by_phone_numb.js.map