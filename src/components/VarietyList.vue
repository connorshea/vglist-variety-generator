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

  <template v-for="series in seriesList" :key="series.name">
    <div>
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
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
