import { getFriends } from "../getUserDetail/fetch_data.js";

export const searchByEmail = async (email: string) => {
  const friends = await getFriends();
  return friends.findIndex(
    (a: any) => a.email.toLowerCase() === email.toLowerCase() && !a.isDeleted,
  );
};
