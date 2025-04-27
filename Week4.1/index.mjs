import chalk from 'chalk';
import fs from 'fs';

function main(fileName) {
    fs.readFile(fileName, "utf-8", (err, data) => {
        if (err) {
            console.error(chalk.red(`Error reading file: ${err.message}`));
            return;
        }
        const words = data.split(" ");
        console.log(chalk.blue(words));
        console.log(chalk.green(`number of words in the file: ${words.length}`));
    });
}

main('a.txt');
console.log(chalk.green(process.argv));
//console.log(chalk.blue("Hello"));
//console.log(chalk.red.bold("This is error"));
//console.log(chalk.green.underline("This is success message"));