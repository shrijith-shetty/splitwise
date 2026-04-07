import { getFriends } from "../../core/getUserDetail/fetch_data.js";
let friends;
const fetchedFriends = await getFriends();
export const searchResults = (input) => {
    friends = fetchedFriends.filter((e) => e.name.includes(input)).map((e) => e);
    //     console.log(friends);
};
export const tablePrint = () => {
    if (friends === undefined || friends.length === 0) {
        console.log("Not found");
        return;
    }
    console.log("------------------------------------------------------------------------------------------------");
    process.stdout.write("| ");
    {
        const label = "IDX";
        const width = 5;
        process.stdout.write(label);
        let space = width - label.length;
        while (space > 0) {
            process.stdout.write(" ");
            space--;
        }
    }
    process.stdout.write(" | ");
    {
        const label = "ID";
        const width = 15;
        process.stdout.write(label);
        let space = width - label.length;
        while (space > 0) {
            process.stdout.write(" ");
            space--;
        }
    }
    process.stdout.write(" | ");
    {
        const label = "NAME";
        const width = 15;
        process.stdout.write(label);
        let space = width - label.length;
        while (space > 0) {
            process.stdout.write(" ");
            space--;
        }
    }
    process.stdout.write(" | ");
    {
        const label = "EMAIL";
        const width = 20;
        process.stdout.write(label);
        let space = width - label.length;
        while (space > 0) {
            process.stdout.write(" ");
            space--;
        }
    }
    process.stdout.write(" | ");
    {
        const label = "PHONE";
        const width = 15;
        process.stdout.write(label);
        let space = width - label.length;
        while (space > 0) {
            process.stdout.write(" ");
            space--;
        }
    }
    process.stdout.write(" | ");
    {
        const label = "BALANCE";
        const width = 7;
        process.stdout.write(label);
        let space = width - label.length;
        while (space > 0) {
            process.stdout.write(" ");
            space--;
        }
    }
    process.stdout.write(" |");
    console.log();
    console.log("------------------------------------------------------------------------------------------------");
    searchResults("a");
};
//# sourceMappingURL=search_result.control.js.map