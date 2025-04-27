import fs from 'fs';
import { Command } from 'commander';
import chalk from 'chalk';

//const { Command } = require('commander');
const program = new Command();

program
    .name('counter')
    .description('CLI to do file based tasks')
    .version('0.8.0');

program.command('count')
    .description('count the number of words in a file')
    .argument('<file>', 'file to count')
    .action((file) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const words = data.split(" ").length;
                console.log(chalk.green(`There are ${words} in the file: ${file}`))
            }

        });
    });

program.parse();