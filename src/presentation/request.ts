import * as readline from "node:readline";

export const ask = (
  question: string,
  rl: readline.Interface,
): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question + " : ", (answer) => {
      resolve(answer);
    });
  });
};
