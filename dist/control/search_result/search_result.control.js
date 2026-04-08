import { getFriends } from "../../core/getUserDetail/fetch_data.js";
import { tablePrint } from "../../presentation/printTable.presentation.js";
export const searchResults = async (input) => {
    const data = await getFriends();
    const cleanInput = input.toLowerCase().trim();
    const friends = data.filter((e) => !e.isDeleted &&
        e.name.toLowerCase().trim().includes(cleanInput) |
            e.email.toLowerCase().trim().includes(cleanInput) |
            e.phone.toLowerCase().trim().includes(cleanInput));
    tablePrint(friends);
    return friends;
};
//# sourceMappingURL=search_result.control.js.map