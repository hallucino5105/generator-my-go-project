"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the fabulous ${chalk.red(
          "generator-my-go-project"
        )} generator!`
      )
    );

    this.props = [];

    this.props.push(
      await this.prompt([
        {
          type: "input",
          name: "project_name",
          message: "Input project name.",
          default: "MyGoTemplate"
        }
      ])
    );

    this.props = Object.assign({}, ...this.props);
  }

  writing() {
    this.copyTarget([
      ["_gitignore", ".gitignore", null],
      ["go.mod", "go.mod", null],
      ["reame.md", "readme.md", null],

      ["pkg/__projectname__", `pkg/${this.props.project_name}`, null],
      ["cmd/__projectname__", `cmd/${this.props.project_name}`, null],
      ["cmd/garg", "cmd/garg", null]
    ]);
  }

  copyTarget(targets) {
    for (const t of targets) {
      if (t[2]) {
        this.fs.copyTpl(
          this.templatePath(t[0]),
          this.destinationPath(t[1]),
          t[2]
        );
      } else {
        this.fs.copy(this.templatePath(t[0]), this.destinationPath(t[1]));
      }
    }
  }

  install() {
    this.installDependencies();
  }
};