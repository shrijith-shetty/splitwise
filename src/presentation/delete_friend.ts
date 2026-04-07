import { promises as fs } from "node:fs";
import { FILE_PATH } from "../core/filt_path.core.js";
import { getFriends } from "../core/getUserDetail/fetch_data.js";
import { searchByName } from "../core/validating/search_by_name.js";
import { json } from "node:stream/consumers";

export const deleteFriendByEmail = async (email: string) => {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const friends = JSON.parse(data);
  if (friends.length === 0) return;
  const updateFriends = friends.filter(
    (f: any) => f.email.toLowerCase() !== email.toLowerCase() && !f.isDeleted,
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

export const deleteFriendByName = async (name: string) => {
  // const data = await fs.readFile(FILE_PATH, "utf-8");
  try {
    const friends = await getFriends();

    if (!friends) {
      console.log("Not found");
    }

    let found = false;

    const updateFriends = friends.map((f: any) => {
      if (f.name.toLowerCase() === name.toLowerCase && !f.isDeleted) {
        found = true;
        return { ...f, isDeleted: true };
      }
      return f;
    });
    if (!found) {
      console.log("No friend found to delete");
      return;
    }

    await fs.writeFile(
      FILE_PATH,
      JSON.stringify(updateFriends, null, 2),
      "utf-8",
    );
    console.log("Friend deleted successfully");
  } catch (e) {
    console.log("error:", e);
  }
};
