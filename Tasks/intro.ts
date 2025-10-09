function task1_1(): void {
    const gbInput: string | null = prompt("Enter the capacity of flash drive (GB): ");

    if (gbInput === null) {
        alert("Operation cancelled");
        return;
    }

    const gb: number = parseInt(gbInput);
    if (isNaN(gb) || gb <= 0) {
        alert("Please enter a valid positive number");
        return;
    }

    const res: number = Math.floor((gb * 8000) / 820);
    alert(`The amount of files that can be stored on your flash drive: ${res.toString()}`);
}

function task1_2() : void {
    let numberInput = prompt("Enter 3-digit number:");

    if (numberInput === null) {
        alert("Operation cancelled");
        return;
    }

    const number = parseInt(numberInput);

    if (isNaN(number)) {
        alert("Please enter a valid number");
        return;
    }

    if (number >= 100 && number <= 999) {
        let hundreds = Math.floor(number / 100);
        let remainder = number % 100;
        let tens = Math.floor(remainder / 10);
        let units = remainder % 10;

        let reversedNumber = units * 100 + tens * 10 + hundreds;

        alert(`Source: ${number}, Reversed: ${reversedNumber}`);
    }
    else alert("Please, enter 3-digit number!");
}

function task1_3(): void {
    let numInput = prompt("Enter the whole number:  ");
    if (numInput === null) {
        alert("Operation cancelled");
        return;
    }
    const wholeNum = parseInt(numInput);

    let isWhole = wholeNum % 1 === 0;
    let isEven = wholeNum % 2 === 0;
    if (!isWhole) {
        alert("Number is not whole!");
    }
    else alert("The parity of your number: " + isEven);
}


function task2_1() : void {
    let ageInput = prompt("Enter the age: ");
    if (ageInput === null) {
        alert("Operation cancelled");
        return;
    }
    const age = parseInt(ageInput);

    if (isNaN(age) || age < 0) {
        alert("Invalid age, please try again.");
        return;
    }

    if (age >= 0 && age <= 12) {
        alert("You are: child");
    }
    else if (age > 12 && age <= 18) {
        alert("You are: teenager");
    }
    else if (age >= 18 && age <= 60) {
        alert("You are: adult");
    }
    else if (age >= 60 && age <= 109) {
        alert("You are: pensioner")
    }
    else if (age >= 110) {
        alert("Are you sure in being human?");
    }
    else alert("Invalid age, please try again.");
}

function task2_2() : void {
    let symbols = [')', '!', '@', '#', '$', '%', '^', '&', '*', '('];
    let numInput = prompt("Enter the number (0-9): ");
    if (numInput === null) {
        alert("Operation cancelled");
        return;
    }
    const num = parseInt(numInput);

    if (num >= 0 && num <= 9) {
        alert(`Your special symbol: ${symbols[num]}`);
    }
    else alert("Invalid number, please try again.");
}

function task2_3() : void {
    let yearInput = prompt("Enter the year: ");
    if (yearInput === null) {
        alert("Operation cancelled");
        return;
    }
    const year = parseInt(yearInput);

    let isLeap = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    alert(`Is your year considered as leap: ${isLeap}`);
}

function task3_1(): void {
    let positiveCount = 0, negativeCount = 0, zeroCount = 0, evenCount = 0, oddCount = 0;
    const MAX_NUM_COUNT = 10;

    const input = prompt("Enter numbers (up to 10, separated by spaces):");
    if (input === null) {
        alert("Operation cancelled");
        return;
    }

    const nums = input
        .trim()
        .split(/\s+/)
        .map(Number)
        .filter(num => !isNaN(num))
        .slice(0, MAX_NUM_COUNT);

    if (nums.length === 0) {
        alert("No valid numbers entered!");
        return;
    }

    if (nums.length > MAX_NUM_COUNT) {
        alert(`You entered more than ${MAX_NUM_COUNT} numbers. Only the first ${MAX_NUM_COUNT} will be used.`);
    }

    for (const num of nums) {
        if (num > 0) positiveCount++;
        else if (num < 0) negativeCount++;
        else zeroCount++;

        if (num % 2 === 0) evenCount++;
        else oddCount++;
    }

    alert(
        `Positive numbers: ${positiveCount}\n` +
        `Negative numbers: ${negativeCount}\n` +
        `Zero numbers: ${zeroCount}\n` +
        `Even numbers: ${evenCount}\n` +
        `Odd numbers: ${oddCount}`
    );
}


function task3_2(): void {
    let isFinish = false;
    while (!isFinish) {
        const aInput = prompt("Enter the first number:");
        const bInput = prompt("Enter the second number:");
        const op = prompt("Enter the operation sign (+, -, *, /):");

        if (aInput === null || bInput === null || op === null) {
            alert("Operation cancelled.");
            return;
        }

        const a = parseFloat(aInput);
        const b = parseFloat(bInput);

        if (isNaN(a) || isNaN(b)) {
            alert("Invalid number entered.");
            continue;
        }

        switch (op) {
            case '+':
                alert(a + b);
                break;
            case '-':
                alert(a - b);
                break;
            case '*':
                alert(a * b);
                break;
            case '/':
                if (b === 0) alert("Error: Division by zero!");
                else alert(a / b);
                break;
            default:
                alert("Undefined operation detected, please try again.");
                break;
        }

        const repeat = prompt("Do you wish to continue? (Any key/n)");
        if (repeat?.toLowerCase() === 'n') isFinish = true;
    }
}


function get_num_difference(a: number, b: number): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

function get_factorial(n: number): number {
    if (n <= 1) return 1;
    return n * get_factorial(n - 1);
}

function get_seconds(hrs: number, mins: number, secs: number = 0): number {
    if (hrs <= 0) return (mins * 60) + secs;
    if (mins <= 0) return (hrs * 3600) + secs;
    return (hrs * 3600) + (mins * 60) + secs;
}

function get_elapsed_seconds(secs: number): string {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const actualSecs = secs % 60;
    return `${hrs}:${mins}:${actualSecs}`;
}

function sum(...nums: number[]): number {
    let res = 0;
    for (const n of nums) res += n;
    return res;
}

function main() {
    task1_1();
    //task1_2();
    //task1_3();

    //task2_1();
    //task2_2();

    //task3_1();
    //task3_2();

    //alert(get_num_difference(1, 1));
    //alert(get_factorial(5));
    //alert(get_seconds(1, 12, 0));
    //alert(get_elapsed_seconds(3693));
    //alert(sum(1, 2, 3, 4));
}