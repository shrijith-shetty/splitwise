import { ask } from "./ask.js";
import { promises as fs } from "node:fs";
import type { Friend } from "../model/friend.js";
import * as readline from "node:readline";
import path from "node:path";
import { searchFriends } from "../controller/search_result/search_result.control.js";
import { UserValidation } from "../core/validator/user_validation.js";

const FILE_PATH = path.resolve(import.meta.dirname, "../../data/friend.json");

export const updateFriend = async (index: number, rl: readline.Interface) => {
  if (index === -1) return "Not found";

  const data = await fs.readFile(FILE_PATH, "utf-8");
  const friends: Friend[] = JSON.parse(data);

  const selectedFriend: Friend | undefined = searchFriends[index];
  if (!selectedFriend) return "Not found";

  // Prefer matching by required unique id
  const actualIndex = friends.findIndex(
    (f) =>
      f.id === selectedFriend.id &&
      f.email === selectedFriend.email &&
      f.phone === selectedFriend.phone,
  );
  if (actualIndex === -1) return "Not found";

  // Guard array access (important when noUncheckedIndexedAccess is on)
  const existing = friends[actualIndex];
  if (!existing) return "Not found";

  const name = await ask("Enter your name", rl, selectedFriend.name);

  let email: string;
  do {
    email = await ask("Enter you email address: ", rl, selectedFriend.email);
    if (email.trim() === "") return true;

    const emailValidation = new UserValidation();
    const ok = await emailValidation.validateEmail(email, {
      ignoreId: existing.id,
    });
    if (ok) break;
  } while (1);

  let phone: string;
  do {
    phone = await ask("Enter you phone number: ", rl, selectedFriend.phone);
    if (phone.trim() === "") return true;

    const emailValidation = new UserValidation();
    const ok = await emailValidation.isValidNumber(phone, {
      ignoreId: existing.id,
    });
    if (ok) break;
  } while (1);

  const balance = await ask(
    "Enter you balance: ",
    rl,
    String(selectedFriend.balance ?? ""),
  );

  friends[actualIndex] = {
    ...existing, // keeps required fields like id
    name,
    email,
    phone,
    balance,
  };

  await fs.writeFile(FILE_PATH, JSON.stringify(friends, null, 2));
};
