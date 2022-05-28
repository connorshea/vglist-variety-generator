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

<style lang="scss">
* {
  box-sizing: border-box;
}

a {
  color: #5856d6;
}

label {
  margin: 0;
  padding: 0 0.5em;
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

  @media screen and (max-width: 450px) {
    margin-top: 20px;
    max-width: 90vw;
  }
}

header {
  margin-bottom: 40px;

  h1 {
    margin-bottom: 0;
  }

  p {
    margin-top: 5px;
  }
}

header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .header-text {
    text-align: left;
  }

  @media screen and (max-width: 900px) {
    flex-flow: row wrap;
  }
}

button.vglist-connect-button {
  background-color: #5856d6;
  color: white;
  padding: 8px 15px;
  cursor: pointer;

  border: 0;
  border-radius: 4px;
  font-size: 14px;

  transition: background-color 200ms;

  &:hover {
    background-color: darken(#5856d6, 15%);
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
}

a.vglist-connect-link {
  display: block;
  text-align: left;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.align-center-mobile {
  @media screen and (max-width: 900px) {
    text-align: center;
  }
}

.teleported-containers {
  @media screen and (max-width: 900px) {
    width: 100%;
  }
}

.mb-0 {
  margin-bottom: 0;
}
</style>
