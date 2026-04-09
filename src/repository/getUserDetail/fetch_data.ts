import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const getFriends = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.resolve(__dirname, "../../../data/friend.json");

  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};
