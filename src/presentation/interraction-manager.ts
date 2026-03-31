import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import type { ValidatorFn } from "../core/validators/validator.type.js";

const rl = readline.createInterface({ input, output });

export interface AskOptions {
  defaultAnswer?: string | undefined;
  validator?: ValidatorFn;
}

export const ask = async (
  question: string,
  options?: AskOptions,
): Promise<string> => {
  const { defaultAnswer, validator } = options || {};

  return new Promise((resolve) => {
    rl.question(
      `${question} ${defaultAnswer ? "(" + defaultAnswer + ")" : ""}: `,
      async (answer: string) => {
        const finalAnswer = answer.trim();

        if (validator && !validator(finalAnswer)) {
          console.log("Invalid input. Please try again.");

          const retry = await ask(question, {
            defaultAnswer,
            validator,
          });

          return resolve(retry);
        }

        resolve(finalAnswer || defaultAnswer || "");
      },
    );
  });
};

export interface Choice {
  label: string;
  value: string;
}

export const choose = async (
  question: string,
  choices: Choice[],
): Promise<Choice | undefined> => {
  console.log(question);
  choices.forEach((choice) => {
    console.log(`${choice.value}. ${choice.label}`);
  });

  const input = await ask("Please enter your choice:", {
    validator: (input: string) =>
      choices.some((choice) => choice.value === input.trim()),
  });

  return choices.find((c) => c.value === input.trim());
};

export const openInterractionManager = () => {
  const rlLocal = readline.createInterface({ input, output });

  const askLocal = async (
    question: string,
    options?: AskOptions,
  ): Promise<string> => {
    const { defaultAnswer, validator } = options || {};

    return new Promise((resolve) => {
      rlLocal.question(
        `${question} ${defaultAnswer ? "(" + defaultAnswer + ")" : ""}: `,
        async (answer: string) => {
          const finalAnswer = answer.trim();

          if (validator && !validator(finalAnswer)) {
            console.log("Invalid input. Please try again.");

            const retry = await askLocal(question, {
              defaultAnswer,
              validator,
            });

            return resolve(retry);
          }

          resolve(finalAnswer || defaultAnswer || "");
        },
      );
    });
  };

  const chooseLocal = async (
    question: string,
    choices: Choice[],
    optional: boolean = false,
  ): Promise<Choice | undefined> => {
    console.log(question);
    choices.forEach((choice) => {
      console.log(`${choice.value}. ${choice.label}`);
    });

    const input = await askLocal("Please enter your choice:", {
      validator: (input: string) => {
        if (optional && input.trim() === "") return true;
        return choices.some((choice) => choice.value === input.trim());
      },
    });

    if (optional && input.trim() === "") {
      return undefined;
    }

    return choices.find((c) => c.value === input.trim());
  };

  const close = () => {
    rlLocal.close();
  };

  return {
    ask: askLocal,
    choose: chooseLocal,
    close,
  };
};
