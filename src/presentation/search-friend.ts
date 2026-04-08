import { promises as fs } from "node:fs";
import * as readline from "node:readline";
import { ask } from "./ask.js";
import { searchByName } from "../core/validator/search_by_name.js";
import { searchByEmail } from "../core/validator/search_by_email.js";
import type { Friend } from "../model/friend.js";
import { getFriends } from "../core/getUserDetail/fetch_data.js";
import { searchResults } from "../controller/search_result/search_result.control.js";

export const searchFriend = async (
  search_Method: string,
  rl: readline.Interface,
) => {
  const friends: Friend[] = await getFriends();
  if (search_Method === "1") {
    const nameOrEmail = await ask("Enter the name to Search\n", rl);
    const result = await searchResults(nameOrEmail);
    if (result.length === 0) console.log("Not found...");
    // console.log(friends[result]);
  } else {
    const nameOrEmail = await ask("Enter the email to search\n", rl);
    const result = await searchResults(nameOrEmail);
    if (result.length === 0) console.log("Not found...");
    // console.log(friends[result]);
  }
};
