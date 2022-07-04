<h1 align="center"> 🔭 Syntax Visualizer </h1>

<p align="center">
<img src="assets/tree.png" width="200">
</p>

<p align="center">
Programming languages syntax visualizer with
<b>Abstract Syntax Tree</b>
&
<b>Node Coordinates Matrix</b> 
representations
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

## Table of Contents

- [Motivation](#motivation)
- [Features](#features)
- [Usage](#usage)
- [Demo](#demo)
- [Run locally](#run-locally)
- [Stack](#stack)
- [License](#license)

## Motivation

> There are many programmers who want to understand the concept of an
> Abstract Syntax Tree, and, more importantly, there also people who study
> compilers and researchers who are interested in the Node Coordinates Matrix
> representation of the AST. The goal of this project is to create an online
> tool for generating AST and NCM from code in real time to make the process
> of exploring these concepts more convenient.

You can read more about NCM concept [here](https://dl.acm.org/doi/10.1145/2935323.2935331)

## Features

- Node Coordinates Matrix representation
- Restoring written code on page reopen
- Nodes highlighting (soon...)
- Sharing (soon...)
- Different programming languages support (soon...)

## Usage

Open [Syntax Visualizer](https://innoswp.github.io/syntax-visualizer/) in the browser and just type the code into the editor and see the result!
Pretty straightforward, right?

## Demo

https://user-images.githubusercontent.com/62389790/176512301-f7ea7d0e-c65b-4724-89d8-2c797d90def7.mov

## Run locally

You can clone and run project locally:
```bash
git clone https://github.com/InnoSWP/syntax-visualizer.git
cd syntax-visualizer
npm install
npm run dev
```

git, nodejs (tested on version 16) and npm are required.

## Stack

- [Vue.js](https://vuejs.org/) as the frontend framework
- [Pinia](https://pinia.vuejs.org/) as a state management framework
- [TypeScript](https://www.typescriptlang.org/) as the language
- [Vite](https://vitejs.dev/) as the build tool
- [ESLint](https://eslint.org/) as the linter
- [Prettier](https://prettier.io/) as the formatter
- [CodeMirror](https://codemirror.net/) as the code editor
- "A" grade as the motivation

## License

The project is licensed under a [MIT license](LICENSE).
