import * as readline from "node:readline";
// import promises = require("node:readline/promises");
import { stdin as input, stdout as output } from "node:process";

const options = [
  { label: "Add Friend", value: "1" },
  { label: "Search Friend", value: "2" },
  { label: "Delete Friend", value: "3" },
  { label: "Remove Friend", value: "4" },
  { label: "Exit", value: "5" },
];

const rl = readline.createInterface({ input, output });

const ask = (input: string) => {
  console.log(input);
};

const addFriend = async () => {
  const name = await ask("Enter friend name:");
  const email = await ask("Enter friend email:");
  const phone = await ask("Enter the phone number:");
  const openingBalance = await ask(
    "Enter opening balance(positive = they owe you, negative = you owe them):",
  );

  const friend = {
    id: Date.now().toString(),
    name,
    email,
    phone,
    balance: Number(openingBalance),
  };

  //   const response = AbortController.addFriend(friend);

  //   if (response) {
  //   }
};

const choose = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question + " ", (answer) => {
      resolve(answer);
    });
  });
};

const manageFriends = async () => {
  while (true) {
    let choice = await choose("what do you want to do?");
    if (!choice) {
      console.log("Exiting...");
      break;
    }
    switch (choice) {
      case "1":
        console.log("Adding friend...");
        await addFriend();
        break;

      case "2":
        console.log("Searching friend...");
        break;

      case "3":
        console.log("Updating friend...");
        break;

      case "4":
        console.log("Removing friend...");
        break;

      case "5":
        console.log("Exiting...");
        rl.close();
        return;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
};

manageFriends();
