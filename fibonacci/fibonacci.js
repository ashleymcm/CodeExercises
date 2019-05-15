function fibonacci(num1, num2, length) {
    if (length > 0) {
        let sum = num1 + num2;
        process.stdout.write(`${sum} `);
        fibonacci(num2, sum, --length);
    }
}

let input = process.argv.slice(2).map(Number);
fibonacci(input[0], input[1], input[2]);