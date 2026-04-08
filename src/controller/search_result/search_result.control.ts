import { getFriends } from "../../core/getUserDetail/fetch_data.js";
import type { Friend } from "../../model/friend.js";

import { tablePrint } from "../../presentation/print-Table_friend.js";
export let searchFriends: Friend[];

export const searchResults = async (input: string) => {
  const data = await getFriends();

  const cleanInput = input.toLowerCase().trim();

  searchFriends = data.filter(
    (e: any) =>
      !e.isDeleted &&
      e.name.toLowerCase().trim().includes(cleanInput) |
        e.email.toLowerCase().trim().includes(cleanInput) |
        e.phone.toLowerCase().trim().includes(cleanInput),
  );

  // tablePrint(searchFriends);
  return searchFriends;
};
