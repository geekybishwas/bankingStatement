"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
// Functions

// const displayMovements = function (movements, sort = false) {
//     containerMovements.innerHTML = "";

//     const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//     movs.forEach(function (mov, i) {
//         const type = mov > 0 ? "deposit" : "withdrawal";

//         const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//             i + 1
//         } ${type}</div>
//         <div class="movements__value">${mov}€</div>
//       </div>
//     `;

//         containerMovements.insertAdjacentHTML("afterbegin", html);
//     });
// };

let sorted = false;
btnSort.addEventListener("click", function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = "";
    ("");
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? "deposit" : "withdrawal";
        const htmL = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
        <div class="movements__value">${mov}</div>
    </div>
    `;
        containerMovements.insertAdjacentHTML("afterbegin", htmL);
    });
};
// displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} EUR`;
};
// calDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes} EUR`;

    const outMoney = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(outMoney)} EUR`;

    const interest = 1.2;
    const interestMoney = acc.movements
        .filter((mov) => mov > 0)
        .map((mov) => (mov * acc.interestRate) / 100)
        .filter((mov) => mov >= 1)
        .reduce((acc, inte) => acc + inte);
    labelSumInterest.textContent = `${interestMoney.toFixed(2)} EUR`;
};
// calcDisplaySummary(account1.movements);

const createUserNames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
    });
};
createUserNames(accounts);
// console.log(accounts);
// displayMovements(account2.movements);

//Event
let currentAccount;

btnLogin.addEventListener("click", function (e) {
    //Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );

    // console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // console.log("LOGIN");

        //Display UI and message
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(" ")[0]
        }`;
        containerApp.style.opacity = 100;

        const now = new Date();
        // console.log(nows);

        //day/month/year
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getMonth() + 1}`.padStart(2, 0);
        const year = now.getFullYear();
        const hour = `${now.getHours()}`.padStart(2, 0);
        const min = `${now.getMinutes()}`.padStart(2, 0);
        const sec = `${now.getSeconds()}`.padStart(2, 0);

        labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}:${sec}`;

        inputLoginUsername.value = inputLoginPin.value = "";

        inputLoginPin.blur();
        //Display movements
        updateUI(currentAccount);
    }
});
const updateUI = function (acc) {
    displayMovements(acc.movements);

    //Display balance
    calDisplayBalance(acc);
    //Display summary
    calcDisplaySummary(acc);
};
btnTransfer.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("valisddddddddd");
    const amount = Number(inputTransferAmount.value);
    console.log(amount);
    const receiverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );
    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        console.log("vALID");
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        //Update UI
        updateUI(currentAccount);
    }
    inputTransferTo.value = inputTransferAmount.value = "";
});
console.log(accounts);

btnClose.addEventListener("click", function (e) {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.username &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );

        accounts.splice(index, 1);

        containerApp.style.opacity = 0;
    }
    inputClosePin.value = inputCloseUsername.value = "";
});

btnLoan.addEventListener("click", function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        currentAccount.movements.push(amount);

        updateUI(currentAccount);
    }
    inputLoanAmount.value = "";
});

//Flat Method
const overallBalance = accounts
    .map((acc) => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

//FlatMap Method
const overallBalance1 = accounts
    .flatMap((acc) => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance1);

labelBalance.addEventListener("click", function () {
    const movementsUI = Array.from(
        document.querySelectorAll(".movements__value")
    ).map((el) => Number(el.textContent));
    console.log(movementsUI);
});

//or , Another way of converting nodelist into an array->using spread operator
// const movementsUI = [...document.querySelectorAll(".movements__value")];
// console.log(movementsUI);

//Array Method Practice

//1.Sum of balanceDepoist
const bankDepoistSum = accounts
    .flatMap((acc) => acc.movements)
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepoistSum);

// 2.Number of depoist greater than or equal to 1000
const numDeposit = accounts
    .flatMap((mov) => mov.movements)
    .filter((mov) => mov >= 1000).length;
console.log(numDeposit);

//OR
const numDeposit1 = accounts
    .flatMap((mov) => mov.movements)
    .filter((mov) => mov > 0)
    .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposit1);

//3.Create a object that contains sum and withdrawal
const sums = accounts
    .flatMap((acc) => acc.movements)
    .reduce(
        (sums, curr) => {
            // curr > 0 ? (sums.depoist += curr) : (sums.withdrawals += curr);
            sums[curr > 0 ? "depoist" : "withdrawals"] += curr;
            return sums;
        },
        { depoist: 0, withdrawals: 0 }
    );
console.log(sums);

//Convert TitleCase
const convertTitleCase = function (title) {
    const exceptions = [
        "an",
        "a",
        "the",
        "and",
        "but",
        "or",
        "on",
        "in",
        "with",
    ];

    const titleCase = title
        .toLowerCase()
        .split(" ")
        .map((word) =>
            exceptions.includes(word)
                ? word
                : word[0].toUpperCase() + word.slice(1)
        )
        .join(" ");
    return titleCase;
};
console.log(convertTitleCase("hey convert me"));
console.log(convertTitleCase("this is a nice title and it's too long"));
console.log(convertTitleCase("and here is a caption for you convert it"));
