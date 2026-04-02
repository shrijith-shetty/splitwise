import { ask } from "./request.js";
import { promises as fs } from "node:fs";
import * as readline from "node:readline";
const FILE_PATH = "./data/friend.json";
export const updateFriend = async (index, rl) => {
    if (index === -1)
        return "Not found";
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const friends = JSON.parse(data);
    const currentIndex = friends[index];
    if (!currentIndex)
        return "Not found";
    const name = await ask("Enter your name", rl, currentIndex?.name);
    const email = await ask("Enter you name: ", rl, currentIndex?.email);
    const phone = await ask("Enter you name: ", rl, currentIndex?.phone);
    const balance = await ask("Enter you name: ", rl, currentIndex?.balance);
    friends[index] = {
        ...currentIndex,
        name: name,
        email: email,
        phone: phone,
        balance: balance,
    };
    await fs.writeFile(FILE_PATH, JSON.stringify(friends, null, 2));
};
//# sourceMappingURL=updateFriend.js.map