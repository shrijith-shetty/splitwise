import { ask } from "./ask.js";
import { promises as fs } from "node:fs";
import * as readline from "node:readline";
import path from "node:path";
import { searchFriends } from "../controller/search_result/search_result.control.js";
import { UserValidation } from "../core/validator/user_validation.js";
const FILE_PATH = path.resolve(import.meta.dirname, "../../data/friend.json");
export const updateFriend = async (index, rl) => {
    if (index === -1)
        return "Not found";
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const friends = JSON.parse(data);
    const currentIndex = searchFriends[index];
    if (!currentIndex)
        return "Not found";
    const name = await ask("Enter your name", rl, currentIndex?.name);
    let email;
    do {
        email = await ask("Enter you email address: ", rl, currentIndex?.email);
        const emailValidation = new UserValidation();
        const exist = emailValidation.emailExist(email);
        if (!exist) {
            break;
        }
    } while (true);
    let phone;
    do {
        phone = await ask("Enter you phone number: ", rl, currentIndex?.phone);
        const emailValidation = new UserValidation();
        const exist = emailValidation.isValidNumber(phone);
        if (!exist) {
            break;
        }
    } while (1);
    const balance = await ask("Enter you balance: ", rl, currentIndex?.balance);
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