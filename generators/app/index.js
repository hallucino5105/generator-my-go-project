"use strict";

const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require("lodash");

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
          name: "projectName",
          message: "Input project name.",
          default: "MyGoProject"
        }
      ])
    );

    const { projectName } = _.find(this.props, "projectName");
    this.props.push({
      projectNameSnakeCase: _.snakeCase(projectName)
    });

    this.props = Object.assign({}, ...this.props);
  }

  writing() {
    this._copyTarget([
      ["_gitignore", ".gitignore", null],
      ["_editorconfig", ".editorconfig", null],
      ["go.mod", "go.mod", this.props],
      ["readme.md", "readme.md", this.props],
      ["Makefile", "Makefile", this.props],

      [
        "pkg/__projectname__",
        `pkg/${this.props.projectNameSnakeCase}`,
        this.props
      ],
      [
        "cmd/__projectname__",
        `cmd/${this.props.projectNameSnakeCase}`,
        this.props
      ],
      ["cmd/garg", "cmd/garg", null]
    ]);
  }

  _copyTarget(targets) {
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
    this.spawnCommand("go", ["mod", "download"]);
  }
};
