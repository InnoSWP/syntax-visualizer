<script setup lang="ts"></script>

<template>
  <h1>Syntax Visualiser</h1>
  <h2>Coming soon... 🚧</h2>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  overflow: hidden;
  background: #161616;
}

body {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

h1 {
  font-family: "Poppins", sans-serif;
  font-size: 64px;
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 24px;
  text-align: center;
  color: #fff;
}

h2 {
  font-family: "JetBrains Mono", monospace;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  color: #a4a4a4;
}

@media only screen and (max-width: 768px) {
  h1 {
    font-size: 48px;
  }
  h2 {
    font-size: 24px;
  }
}

@media only screen and (max-width: 425px) {
  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 16px;
  }
}
</style>
