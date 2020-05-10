const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const inquirer = require("inquirer");
const render = require("./lib/htmlRenderer.js");

const employees = [];



function addMember() {
    inquirer.prompt([{
        message: "Enter Team Member's name",
        name: "Name"
    },
    {
        type: "list",
        message: "Select Team Member's Role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter Team Member's ID",
        name: "ID"
    },
    {
        message: "Enter Team Member's E-mail Address",
        name: "E-Mail"
    }])
        .then(function ({ name, role, id, email }) {
            let roleInfo = "";
            if (role === "Engineer") {
                roleInfo = "GitHub username";
            } else if (role === "Intern") {
                roleInfo = "school name";
            } else {
                roleInfo = "office phone number";
            }
            inquirer.prompt([{
                message: `Enter Team Member's ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add more Team Members?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers"
            }])
                .then(function ({ roleInfo, moreMembers }) {
                    let newMember;
                    if (role === "Engineer") {
                        newMember = new Engineer(name, id, email, roleInfo);
                    } else if (role === "Intern") {
                        newMember = new Intern(name, id, email, roleInfo);
                    } else {
                        newMember = new Manager(name, id, email, roleInfo);
                    }
                    employees.push(newMember);
                    if (moreMembers === "yes") {
                        addMember();
                    } else {
                        finishHtml();
                    }
                });

        });
}

function finishHtml() {
    const template = render(employees);
    fs.writeFile("./output/team.html", template, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("Your Team Generator has been made! ");
}
addMember();

module.exports = app;
