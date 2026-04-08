import * as readline from "node:readline";
import { ask } from "./ask.js";
import { updateFriend } from "./updateFriend.js";
import { searchByEmail } from "../core/validating/search_by_email.js";
import { searchByPhoneNumber } from "../core/validating/search_by_phone_numb.js";
import { searchResults } from "../control/search_result/search_result.control.js";
import type { Friend } from "../model/friend.js";

export const updateSearchFriend = async (
  search_Method: string,
  rl: readline.Interface,
) => {
  let result: Friend[];
  if (search_Method === "1") {
    const phone_numb = await ask("Enter the phone number to Search\n", rl);
    result = await searchResults(phone_numb);
    if (result.length === 0) {
      console.log("Not found...");
      return;
    }
  } else {
    const email = await ask("Enter the email to search\n", rl);
    result = await searchResults(email);
    // console.log(result);
    if (result.length === 0) {
      console.log("Not found...");
      return;
    }
  }

  const index = await ask("Enter the index to update", rl)
  await updateFriend(index, rl);
};
