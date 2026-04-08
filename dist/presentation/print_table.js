export const tablePrint = (friends) => {
    if (!friends?.length) {
        console.log("Not found");
        return;
    }
    const columns = [
        { key: "idx", label: "IDX", width: 5 },
        { key: "id", label: "ID", width: 15 },
        { key: "name", label: "NAME", width: 15 },
        { key: "email", label: "EMAIL", width: 20 },
        { key: "phone", label: "PHONE", width: 15 },
        { key: "balance", label: "BALANCE", width: 7 },
    ];
    const pad = (value, width) => value.padEnd(width, " ");
    const separator = "-".repeat(columns.reduce((acc, col) => acc + col.width + 3, 1));
    // Header
    console.log(separator);
    const header = "| " + columns.map((col) => pad(col.label, col.width)).join(" | ") + " |";
    console.log(header);
    console.log(separator);
    // Rows
    friends.forEach((friend, index) => {
        const row = "| " +
            columns
                .map((col) => {
                if (col.key === "idx")
                    return pad(index.toString(), col.width);
                const value = friend[col.key] ?? "";
                return pad(value.toString(), col.width);
            })
                .join(" | ") +
            " |";
        console.log(row);
    });
    console.log(separator);
    console.log(`\nTotal: ${friends.length} friend(s) found\n`);
};
//# sourceMappingURL=print_table.js.map