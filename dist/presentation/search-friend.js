import { promises as fs } from "node:fs";
import * as readline from "node:readline";
// import { existsSync, mkdirSync } from "node:fs";
import { ask } from "./request.js";
import path from "node:path";
export const searchFriend = async (search_Method, rl) => {
    if (search_Method === "1") {
        const nameOrEmail = await ask("Enter the name to Search\n", rl);
        const result = await searchByName(nameOrEmail);
        if (!result)
            console.log("Not found...");
        console.log(result);
    }
    else {
        const nameOrEmail = await ask("Enter the email to search\n", rl);
        const result = await searchByEmail(nameOrEmail);
        if (!result)
            console.log("Not found...");
        console.log(result);
    }
};
const getFriends = async () => {
    const filePath = path.resolve("./data/friend.json");
    const data = await fs.readFile(filePath, "utf-8");
    //   console.log(JSON.parse(data));
    return JSON.parse(data);
};
const searchByEmail = async (email) => {
    const friends = await getFriends();
    return friends.find((a) => a.email.toLowerCase() === email.toLowerCase() && !a.isDelete);
};
const searchByName = async (name) => {
    const friends = await getFriends();
    return friends.find((a) => a.name.toLowerCase() === name.toLowerCase() && !a.isDelete);
};
//# sourceMappingURL=search-friend.js.map