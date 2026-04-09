import * as readline from "node:readline";
export const choose = (question, rl) => {
    return new Promise((resolve) => {
        rl.question(question + " ", resolve);
    });
};
//# sourceMappingURL=choice.js.map