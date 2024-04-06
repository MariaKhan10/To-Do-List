#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let condition = true;
let todos = [];
async function makeTodo(todos) {
    while (condition) {
        let ans = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: chalk.bold.red("Select any one operation.."),
                choices: ["Add", "Update", "View", "Delete", "Exit"],
            },
        ]);
        if (ans.operation === "Add") {
            let addTodo = await inquirer.prompt([
                {
                    name: "todo",
                    type: "input",
                    message: chalk.yellow("Add items in your List.."),
                },
                {
                    name: "addmore",
                    type: "confirm",
                    message: "Do you want to add more todo?",
                    default: false,
                },
            ]);
            todos.push(addTodo.todo);
            console.log(chalk.greenBright(todos));
        }
        if (ans.operation === "Update") {
            let updateTodo = await inquirer.prompt([
                {
                    name: "todo",
                    type: "list",
                    message: chalk.yellow("Choose an Item you want to update in your List"),
                    choices: todos.map((item) => item),
                },
            ]);
            let addTodo = await inquirer.prompt([
                {
                    name: "todo",
                    type: "input",
                    message: "Enter updated item...",
                },
            ]);
            let updatedtodo = todos.filter((value) => value !== updateTodo.todo);
            todos = [...updatedtodo, addTodo.todo];
            console.log(todos);
        }
        if (ans.operation === "View") {
            console.log(chalk.bold.bgGray.whiteBright("Your To-Do List"));
            console.log(todos);
        }
        if (ans.operation === "Delete") {
            let deleteTodo = await inquirer.prompt([
                {
                    name: "todo",
                    type: "list",
                    message: chalk.redBright.red("Delete items in your List"),
                    choices: todos.map((item) => item),
                },
            ]);
            let updatedtodo = todos.filter((value) => value !== deleteTodo.todo);
            todos = [...updatedtodo];
            console.log(todos);
        }
        if (ans.operation === "Exit") {
            condition = false;
            console.log(chalk.bold.cyanBright("---- Thanks for using ToDo App..! ----"));
        }
    }
}
makeTodo(todos);
