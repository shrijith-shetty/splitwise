import * as readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { ValidatorFn } from "../core/validators";

const rl = readline.createInterface({ input, output });

export interface AskOptions {
  defaultAnswer: string | undefined;
  validator: ValidatorFn | undefined;
}

export const ask = async (
  question: string,
  options: AskOptions,
): Promise<string> => {
  const { defaultAnswer, validator } = options || {}; // destructuring

  return new Promise((resolve) => {
    rl.question(
      `${question} ${defaultAnswer ? "(" + defaultAnswer + ")" : ""}: `,
      async (answer: string) => {
        if (validator && !validator(answer)) {
          console.log("Invalid input. Please try again.");

          const retry = await ask(question, {
            defaultAnswer,
            validator,
          });

          return resolve(retry);
        }

        resolve(answer || defaultAnswer || "");
      },
    );
  });
};

export interface Choice {
  label: string;
  value: string;
}

// const genders : Choice []  = [
//     {label : 'Male', value : 'M'},
//     {label :'Female', value : 'F'},
//     {label : 'Other', value : 'O'},
// ]

// const expenseTypes : : Choice = [
//     {label : 'Food', value : 'Food'},
//     {label : 'Transport', value : 'TRANSPORT'},
//     {label : 'Entertainment', value : 'ENTERAINMENT'},
//     {label : 'OTHER', value : 'OTHER'}
// ]

export const choose = async (question: string, choices: Choice[]) => {
  console.log(question);
  choices.forEach((choice) => {
    console.log(`${choice.value}. ${choice.label}`);
  });
  return ask("Please enter your choice:", {
    validator: (input) => choices.some((choice) => choice.value === input),
  });
};

export const initialiseInterractionManager = () => {
  const rl = readline.createInterface({ input, output });

  return new Promise((resolve) => {
    rl.question(
      `${question} ${defaultAnswer ? "(" + defaultAnswer + ")" : ""}: `,
      async (answer: string) => {
        if (validator && !validator(answer)) {
          console.log("Invalid input. Please try again.");

          const retry = await ask(question, {
            defaultAnswer,
            validator,
          });

          return resolve(retry);
        }

        resolve(answer || defaultAnswer || "");
      },
    );
  });


  const choose = async (question: string, choices: Choice[]) => {
    console.log(question);
    choices.forEach((choice) => {
      console.log(`${choice.value}. ${choice.label}`);
    });
    return ask("Please enter your choice:", {
      validator: (input) => choices.some((choice) => choice.value === input),
    });
  };
};
