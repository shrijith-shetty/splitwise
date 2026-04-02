import * as readline from "node:readline";

export const ask = (
  question: string,
  rl: readline.Interface,
  input?: string,
): Promise<string> => {
  return new Promise((resolve) => {
    const prompt =
      input !== undefined ? `${question} (${input}): ` : `${question}: `;
    rl.question(prompt, (answer) => {
      if (answer.trim() === "" && input !== undefined) resolve(input);
      else resolve(answer);
    });
  });
};
