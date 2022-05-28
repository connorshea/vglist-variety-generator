<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { series } from '../assets/series.json';

interface Props {
  gameSeriesInLibrary: string[]
  requestsCompleted: boolean
}

const loading = ref(true);
const props = defineProps<Props>();

const seriesList = series;
const selectedSeriesList = ref([]);
const count = computed(() => selectedSeriesList.value.length);

watch(() => props.requestsCompleted, (newRequestsCompleted) => {
  if (newRequestsCompleted) {
    let seriesIds = props.gameSeriesInLibrary.map((seriesId) => parseInt(seriesId));
    console.log(`seriesIds`);
    console.log(seriesIds);
    // TODO: grab all the series IDs from the GraphQL requests and find the corresponding series' in the series JSON blob.

    loading.value = false;
  }
});
</script>

<template>
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
  cursor: pointer;
  font-weight: bold;
}

input[type="checkbox"] {
  cursor: pointer;
}

.checkboxes-container {
  max-width: 70vw;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  row-gap: 1rem;
}

/* Go down to three columns on <1200px, 2 columns <900px, and 1 column below 400px. */
@media screen and (max-width: 1200px) {
  .checkboxes-container {
    grid-template-columns: 1fr 1fr auto;
  }
}

@media screen and (max-width: 900px) {
  .checkboxes-container {
    grid-template-columns: 1fr auto;
  }
}

@media screen and (max-width: 400px) {
  .checkboxes-container {
    grid-template-columns: max-content;
  }
}

.checkbox-container {
  display: flex;
  align-items: baseline;
  text-align: left;
}
</style>
