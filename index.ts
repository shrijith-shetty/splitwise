const readline = require("node:readline/promises");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("fs");

const rl = readline.createInterface({ input, output });

const numberValidator = (input: number) => {
  const num = parseInt(input, 10);
  return !isNaN(num);
};

const optionsValidator = (options) => {
  return (input) => {
    return options.includes(input);
  };
};

const ask = async (
  question: string,
  defaultAnswer: string,
  validator?: (input: string) => boolean,
) => {
  return new Promise((resolve) => {
    rl.question(
      question + `${defaultAnswer ? "(" + defaultAnswer + ")" : ""}`,
      (answer: string) => {
        if (validator && !validator(answer)) {
          console.log("Invalid input. please try again.");
        }
        resolve(answer || defaultAnswer);
      },
    );
  });
};

// const run = async () => {
//   const package_name = await ask("package name:\t", "KD");
//   console.log(`hello, ${name}!`);

//   const age = await ask("How old are you ?",'18', numberValidator);
//   console.log(`your age is ${age}`);

//   const gender = await ask("what is your gender?\n1.male\n2.Female\n3.other\n:",optionsValidator(['1','2','3']));
//   console.log(`You are ${gender ==='1'?'male':gender ==='2'?'female:other'}`);

//   rl.close();
// };

const printMonth = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = new Date().getMonth;
  console.log(`Current month : ${monthNames[month]}`);
};

const printYear = () => {
  const year = new Date().getFullYear();
  console.log(`Current year : ${year}`);
};

const printDay = () => {
  const day = new Date().getFullYear();
  console.log(`Current year : ${day}`);
};

const printDayOfWeek = () => {
  const dayNames = [
    "Sunday",
    "Monday",
    "tuesday",
    "wednesday",
    "thurdday",
    "Friday",
    "saturday",
  ];
  const dayOfWeek = new Date().getDay();
  console.log(`Current day of the week : ${dayNames[dayOfWeek]}`);
};

const run = async () => {
  while (true) {
    const prompt =
      "What do you wna tto know abou tthe current date? \n Option:\n";
    const choice = await ask(
      prompt,
      null,
      optionsValidator(["1", "2", "3", "4"]),
    );

    switch (choice) {
      case "1":
        printMonth();
        break;
      case "2":
        printYear();
        break;
      case "3":
        printDay();
        break;
      case "4":
        printDayOfWeek();
        break;
      case "5":
        console.log("GoodBye");
        rl.close();
        break;
    }
  }
};

run();
