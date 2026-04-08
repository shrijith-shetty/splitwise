import * as readline from "node:readline";

export const choose = (
  question: string,
  rl: readline.Interface,
): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question + " ", resolve);
  });
};
