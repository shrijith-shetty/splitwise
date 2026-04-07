import { promises as fs } from "node:fs";
import * as readline from "node:readline";
import { ask } from "./request.js";
import path from "node:path";
import { updateFriend } from "./updateFriend.js";

export const updateSearchFriend = async (
  search_Method: string,
  rl: readline.Interface,
) => {
  let result: number;
  if (search_Method === "1") {
    const phone_numb = await ask("Enter the phone number to Search\n", rl);
    result = await searchByName(phone_numb);
    if (result === -1) {
      console.log("Not found...");
      return;
    }
  } else {
    const email = await ask("Enter the email to search\n", rl);
    result = await searchByEmail(email);
    console.log(result);
    if (result === -1) {
      console.log("Not found...");
      return;
    }
  }
  await updateFriend(result, rl);
};

const getFriends = async () => {
  const filePath = path.resolve(import.meta.dirname, "../../data/friend.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const searchByEmail = async (email: string) => {
  const friends = await getFriends();
  return friends.findIndex(
    (a: any) => a.email.toLowerCase() === email.toLowerCase() && !a.isDelete,
  );
};

const searchByName = async (phone: string) => {
  const friends = await getFriends();
  return friends.findIndex(
    (a: any) => a.phone.toLowerCase() === phone.toLowerCase() && !a.isDelete,
  );
};
