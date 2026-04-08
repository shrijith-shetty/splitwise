import { getFriends } from "../../core/getUserDetail/fetch_data.js";
import { tablePrint } from "../../presentation/print_table.js";
export const searchResults = async (input: string) => {
  const data = await getFriends();
  const cleanInput = input.toLowerCase().trim();
  const friends = data.filter(
    (e: any) =>
      !e.isDelete &&
      (e.name.toLowerCase().split(" ").includes(cleanInput) ||
        e.email.toLowerCase().split(" ").includes(cleanInput) ||
        e.phone.toLowerCase().split(" ").includes(cleanInput)),
  );
  tablePrint(friends);
};
