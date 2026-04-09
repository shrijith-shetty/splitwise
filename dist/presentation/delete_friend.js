import { promises as fs } from "node:fs";
import { FILE_PATH } from "../core/filt_path.core.js";
import { getFriends } from "../repository/getUserDetail/fetch_data.js";
export const deleteFriendByEmail = async (email) => {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const friends = JSON.parse(data);
    if (friends.length === 0)
        return;
    const updateFriends = friends.filter((f) => f.email.toLowerCase() !== email.toLowerCase() && !f.isDeleted);
    if (friends.length === updateFriends.length) {
        console.log("No friend found to delete");
        return;
    }
    await fs.writeFile(FILE_PATH, JSON.stringify(updateFriends, null, 2), "utf-8");
    console.log("Friend deleted successfully");
    return;
};
export const deleteFriendByName = async (name) => {
    try {
        const friends = await getFriends();
        if (!friends) {
            console.log("Not found");
        }
        let found = false;
        const updateFriends = friends.map((f) => {
            if (f.name.toLowerCase() === name.toLowerCase && !f.isDeleted) {
                if (f.balance !== 0) {
                    console.log("Can't delete(balance not zero)");
                    return;
                }
                found = true;
                return { ...f, isDeleted: true };
            }
            return f;
        });
        if (!found) {
            console.log("No friend found to delete");
            return;
        }
        await fs.writeFile(FILE_PATH, JSON.stringify(updateFriends, null, 2), "utf-8");
        console.log("Friend deleted successfully");
    }
    catch (e) {
        console.log("error:", e);
    }
};
//# sourceMappingURL=delete_friend.js.map