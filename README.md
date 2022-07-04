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

## Features

- [Node Coordinates Matrix](#nodes-coordinates-matrix)
- Restoring written code on page reopen
- Sharing
- Nodes highlighting (soon...)
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

## Nodes Coordinates Matrix
Node Coordinates Matrix is a representation of "an encoding of the inter-node relationships between nodes in an AST" [[1]](#references).
In conjunction with the Key operator this concept is necessary for performing parallel computations over an AST: "...permits arbitrary computation over sub-trees of an AST using purely data-parallel array programming techniques" [[1]](#references).

Please, read [this article](#references) for more information.

## Stack

- [Vue.js](https://vuejs.org/) as the frontend framework
- [Pinia](https://pinia.vuejs.org/) as a state management framework
- [TypeScript](https://www.typescriptlang.org/) as the language
- [Vite](https://vitejs.dev/) as the build tool
- [ESLint](https://eslint.org/) as the linter
- [Prettier](https://prettier.io/) as the formatter
- [CodeMirror](https://codemirror.net/) as the code editor
- "A" grade as the motivation

## References
[1] A. W. H. I. University, A. W. Hsu, I. University, and O. M. V. A. Metrics, “The key to a data parallel compiler: Proceedings of the 3rd ACM SIGPLAN International Workshop on libraries, languages, and compilers for Array Programming,” _ACM Conferences_, 01-Jun-2016. [Online]. Available: https://dl.acm.org/doi/10.1145/2935323.2935331. [Accessed: 03-Jun-2022].

## License

The project is licensed under a [MIT license](LICENSE).
