import { promises as fs } from "node:fs";
import * as readline from "node:readline";
import { existsSync, mkdirSync } from "node:fs";
import { ask } from "./ask.js";
import type { Friend } from "../model/friend.js";
import path from "node:path";
import { getFriends } from "../repository/getUserDetail/fetch_data.js";

const FILE_PATH = path.resolve(import.meta.dirname, "../../data/friend.json");

export const addFriend = async (rl: readline.Interface) => {
  const name: string = await ask("Enter friend name", rl);
  const data = await getFriends();
  let email: string;
  do {
    email = await ask("Enter friend email", rl);
    if (email.length === 0) break;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Invalid email format. Use: username@company.com");
      continue;
    }
    if (!data?.some((e: Friend) => e.email === email)) break;
    console.log(`${email} already exist!`);
  } while (true);

  let phone: string;
  do {
    phone = await ask("Enter phone number", rl);
    if (phone.length === 0) break;
    if (phone.length !== 10) {
      console.log("phone number should be of 10 digit");
      continue;
    }
    const isExist = data.some((p: Friend) => p.phone === phone);
    if (!isExist) break;

    console.log("Is already exist!");
  } while (true);
  const balance: string = await ask("Enter opening balance", rl);

  const newFriend: Friend = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    balance: "0",
    isDeleted: false,
  };

  try {
    if (!existsSync(FILE_PATH)) {
      await fs.writeFile(FILE_PATH, "[]");
    }

    const data = await fs.readFile(FILE_PATH, "utf-8");
    const friends = JSON.parse(data);

    friends.push(newFriend);

    await fs.writeFile(FILE_PATH, JSON.stringify(friends, null, 2));

  } catch (err) {
    console.error("Error saving Friend:", err);
  }
};
