import { promises as fs } from "node:fs";
import * as readline from "node:readline";
import { existsSync, mkdirSync } from "node:fs";
import { ask } from "./request.ts";

const FILE_PATH = "./data/friend.json";

export const addFriend = async (rl: readline.Interface) => {
  const name: string = await ask("Enter friend name", rl);
  const email: string = await ask("Enter friend email", rl);
  const phone: string = await ask("Enter phone number", rl);
  const openingBalance: string = await ask("Enter opening balance", rl);

  const newFriend = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    balance: Number(openingBalance),
  };

  try {
    if (!existsSync("./data")) {
      mkdirSync("./data");
    }

    if (!existsSync(FILE_PATH)) {
      await fs.writeFile(FILE_PATH, "[]");
    }

    const data = await fs.readFile(FILE_PATH, "utf-8");
    const friends = JSON.parse(data);

    friends.push(newFriend);

    await fs.writeFile(FILE_PATH, JSON.stringify(friends, null, 2));

    console.log("Friend saved!");
  } catch (err) {
    console.error("Error saving Friend:", err);
  }
};
