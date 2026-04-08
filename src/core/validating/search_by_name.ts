import { getFriends } from "../getUserDetail/fetch_data.js";

export const searchByName = async (name: string) => {
  const friends = await getFriends();
  return friends.findIndex(
    (a: any) => a.name.toLowerCase() === name.toLowerCase() && !a.isDeleted,
  );
};
