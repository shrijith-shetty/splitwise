type Friend = {
  name: string;
  balance: number;
};

class ExpenseApp {
  friends: Friend[] = [];

  addFriend(name: string) {
    this.friends.push({
      name,
      balance: 0,
    });
  }

  getAllFriends() {
    return this.friends;
  }

  updateBalance(name: string, amount: number) {
    let friend = this.friends.find((f) => f.name === name);

    if (friend) {
      friend.balance += amount;
    }
  }

  printState() {
    console.log("\nFriends:");

    this.friends.forEach((f) => {
      if (f.balance > 0) {
        console.log(f.name + " gets ₹" + f.balance);
      } else if (f.balance < 0) {
        console.log(f.name + " owes ₹" + Math.abs(f.balance));
      } else {
        console.log(f.name + " is settled");
      }
    });

    console.log("");
  }
}

const app = new ExpenseApp();

app.addFriend("Ram");
app.addFriend("Shyam");

app.updateBalance("Ram", 100);
app.updateBalance("Shyam", -100);

app.printState();
