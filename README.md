<h1 align="center"> 🔭 Syntax Visualizer </h1>

<p align="center">
<img src="assets/tree.png" width="200">
</p>

<p align="center">
Programming languages syntax visualizer with
<strong>Abstract Syntax Tree</strong>
&
<strong>Node Coordinates Matrix</strong> 
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
- [Examples](#examples)
- [Run locally](#run-locally)
- [Stack](#stack)

## Motivation

> There are many programmers who want to understand the concept of an
> Abstract Syntax Tree, and, more importantly, there also people who study
> compilers and researchers who are interested in the Node Coordinates Matrix
> representation of the AST. The goal of this project is to create an online
> tool for generating AST and NCM from code in real time to make the process
> of exploring these concepts more convenient.

## Features

- Node Coordinates Matrix representation of the AST
- Support for different programming languages
- Highly customizable
- Sharing

## Usage

Just the type the code in the editor and see the result!
Pretty straightforward, right?

See the [examples](#examples) for more information.

## Examples

https://user-images.githubusercontent.com/62389790/176512301-f7ea7d0e-c65b-4724-89d8-2c797d90def7.mov

## Run locally

You will need...
- node.js
- git
- npm

```bash
git clone https://github.com/InnoSWP/syntax-visualizer.git
cd syntax-visualizer
npm install
npm run dev
```

## Stack

- [Vue.js](https://vuejs.org/) as the frontend framework
- [Pinia](https://pinia.vuejs.org/) as a state management framework
- [TypeScript](https://www.typescriptlang.org/) as the language
- [Vite](https://vitejs.dev/) as the build tool
- [ESLint](https://eslint.org/) as the linter
- [Prettier](https://prettier.io/) as the formatter
- [Monaco](https://microsoft.github.io/monaco-editor/) & [CodeMirror](https://codemirror.net/) as the editors
- "A" grade as the motivation
