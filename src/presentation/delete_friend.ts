import path from "node:path";
import { promises as fs } from "node:fs";
import * as readline from "node:readline";

const FILE_PATH = "./data/friend.json";

export const deleteFriendByEmail = async (
  email: string,
  rl: readline.Interface,
) => {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const friends = JSON.parse(data);

  const updateFriends = friends.filter(
    (f: any) => f.email.toLowerCase() !== email.toLowerCase(),
  );

  if (friends.length === updateFriends.length) {
    console.log("No friend found to delete");
    return;
  }

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(updateFriends, null, 2),
    "utf-8",
  );
  console.log("Friend deleted successfully");
};

export const deleteFriendByName = async (
  name: string,
  rl: readline.Interface,
) => {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const friends = JSON.parse(data);

  const updateFriends = friends.filter(
    (f: any) => f.name.toLowerCase() !== name.toLowerCase(),
  );

  if (friends.length === updateFriends.length) {
    console.log("No friend found to delete");
    return;
  }

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(updateFriends, null, 2),
    "utf-8",
  );
  console.log("Friend deleted successfully");
};
