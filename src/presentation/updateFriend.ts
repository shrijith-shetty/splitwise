import { ask } from "./ask.js";
import { promises as fs } from "node:fs";
import type { Friend } from "../model/friend.js";
import * as readline from "node:readline";
import path from "node:path";

const FILE_PATH = path.resolve(import.meta.dirname, "../../data/friend.json");

export const updateFriend = async (index: string, rl: readline.Interface) => {
  if (index === "-1") return "Not found";
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const friends: Friend[] = JSON.parse(data);
  const currentIndex: Friend | undefined = friends[index];
  if (!currentIndex) return "Not found";
  const name = await ask("Enter your name", rl, currentIndex?.name);
  const email = await ask("Enter you email address: ", rl, currentIndex?.email);
  const phone = await ask("Enter you phone number: ", rl, currentIndex?.phone);
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
