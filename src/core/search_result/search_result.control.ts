import { getFriends } from "../../repository/getUserDetail/fetch_data.js";
import type { Friend } from "../../model/friend.js";
export let searchFriends: Friend[];

export const searchResults = async (input: string) => {
  const data = await getFriends();

  const cleanInput = input.toLowerCase().trim();

  searchFriends = data.filter((e: any) => {
    const matches =
      e.name.toLowerCase().trim().includes(cleanInput) ||
      e.email.toLowerCase().trim().includes(cleanInput) ||
      e.phone.toLowerCase().trim().includes(cleanInput);

    return !e.isDeleted && matches;
  });

  return searchFriends;
};
