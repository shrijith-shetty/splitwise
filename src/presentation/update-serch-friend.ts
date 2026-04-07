import * as readline from "node:readline";
import { ask } from "./ask.js";
import { updateFriend } from "./updateFriend.js";
import { searchByEmail } from "../core/validating/search_by_email.js";
import { searchByPhoneNumber } from "../core/validating/search_by_phone_numb.js";

export const updateSearchFriend = async (
  search_Method: string,
  rl: readline.Interface,
) => {
  let result: number;
  if (search_Method === "1") {
    const phone_numb = await ask("Enter the phone number to Search\n", rl);
    result = await searchByPhoneNumber(phone_numb);
    if (result === -1) {
      console.log("Not found...");
      return;
    }
  } else {
    const email = await ask("Enter the email to search\n", rl);
    result = await searchByEmail(email);
    // console.log(result);
    if (result === -1) {
      console.log("Not found...");
      return;
    }
  }
  await updateFriend(result, rl);
};
