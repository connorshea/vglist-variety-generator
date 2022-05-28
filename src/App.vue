<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Container from './components/Container.vue'

const redirectUri = import.meta.env.VITE_VGLIST_REDIRECT_URI;
const clientId = import.meta.env.VITE_VGLIST_CLIENT_ID;
</script>

<template>
  <Container
    :client-id="clientId"
    :redirect-uri="redirectUri"
  />
</template>

<style>
* {
  box-sizing: border-box;
}

a {
  color: #5856d6;
}

label {
  margin: 0 0.5em;
  cursor: pointer;
  font-weight: bold;
}

body {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

#app-container {
  max-width: 70vw;
  margin: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
