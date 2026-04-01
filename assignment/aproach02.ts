type Friend = {
  name: string;
};

type Expense = {
  payer: string;
  participants: string[];
  amount: number;
};

class ExpenseApp {
  friends: Friend[] = [];
  expenses: Expense[] = [];

  addFriend(name: string) {
    this.friends.push({ name });
  }

  addExpense(payer: string, participants: string[], amount: number) {
    this.expenses.push({
      payer,
      participants,
      amount,
    });
  }

  getBalance(name: string) {
    let total = 0;

    for (let e of this.expenses) {
      let share = e.amount / e.participants.length;

      if (e.payer === name) {
        total += e.amount - share;
      }

      if (e.participants.includes(name) && e.payer !== name) {
        total -= share;
      }
    }

    return total;
  }

  printState() {
    console.log("\nFriends:");
    this.friends.forEach((f) => {
      console.log(f.name);
    });

    console.log("\nExpenses:");
    this.expenses.forEach((e) => {
      console.log(e.payer, "paid", e.amount, "for", e.participants.join(", "));
    });

    console.log("\nBalances:");
    this.friends.forEach((f) => {
      let bal = this.getBalance(f.name);

      if (bal > 0) {
        console.log(f.name + " gets ₹" + bal);
      } else if (bal < 0) {
        console.log(f.name + " owes ₹" + Math.abs(bal));
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
app.addFriend("Ravi");

app.addExpense("Ram", ["Ram", "Shyam", "Ravi"], 300);
app.addExpense("Shyam", ["Shyam", "Ravi"], 200);

app.printState();
