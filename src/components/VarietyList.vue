<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue'
import { series } from '../assets/series.json'

const seriesList = series;
const selectedSeriesList = ref([]);
const count = computed(() => { return selectedSeriesList.value.length; })
</script>

<template>
  <h1>Variety List</h1>
  <h2>{{ count }} / {{ seriesList.length }}</h2>

  <div class="checkboxes-container">
    <template v-for="series in seriesList" :key="series.name">
      <div class="checkbox-container">
        <input
          type="checkbox"
          :id="series.name"
          :name="series.name"
          :value="series"
          v-model="selectedSeriesList"
        />
        <label :for="series.name">{{ series.name }}</label>
      </div>
    </template>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

.checkboxes-container {
  width: 70vw;
  margin: auto;
  display: flex;
  flex-flow: row wrap;
}

.checkbox-container {
  display: block;
  text-align: left;
  flex-grow: 1;
  width: 33%;
  margin-bottom: 15px;
}
</style>
