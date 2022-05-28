<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import { series } from '../assets/series.json';

interface Props {
  gameSeriesInLibrary: string[]
  requestsCompleted: boolean
}

type Series = {
  name: string;
  vglistIds: number[];
}

const loading = ref(true);
const props = defineProps<Props>();

const seriesList: Series[] = series;
// The selected series', for representing the list of checkboxes.
const selectedSeriesList: Ref<Series[]> = ref([]);
// Pull all the series IDs out of selectedSeriesList.
const selectedSeriesListSeriesIds = computed(() => {
  return selectedSeriesList.value.flatMap((seriesObj) => seriesObj.vglistIds);
});
const count = computed(() => selectedSeriesList.value.length);

// When the requests complete, auto-populate selectedSeriesList.
watch(() => props.requestsCompleted, (newRequestsCompleted) => {
  if (newRequestsCompleted) {
    // Grab all the series IDs from the GraphQL requests and find the
    // corresponding series' in the series JSON blob.

    // Get the seriesIds from GraphQL, and make them unique so we don't perform unnecessary loops.
    const seriesIdsFromGraphQL = [...new Set(props.gameSeriesInLibrary.map((seriesId) => parseInt(seriesId)))];
    const seriesIdsFromList = seriesList.flatMap((series) => series.vglistIds);

    // Intersect the series IDs in the static list and the seriesIds from the
    // GraphQL API, and then iterate over them.
    for (const seriesId of seriesIdsFromGraphQL.filter(value => seriesIdsFromList.includes(value))) {
      // Skip this if it's already represented by the selectedSeriesList, no
      // need to try and populate it again.
      if (selectedSeriesListSeriesIds.value.includes(seriesId)) {
        continue;
      }

      // Try to find the series in the seriesList using the seriesId, and then
      // append the series object to the selectedSeriesList if it is found.
      let seriesObj = seriesList.find((series) => series.vglistIds.includes(seriesId)) ?? null;
      if (seriesObj !== null) {
        selectedSeriesList.value.push(seriesObj);
      }
    }
    loading.value = false;
  }
});
</script>

<template>
  <Teleport to="#counter-container">
    <h2><strong>{{ count }}</strong> / {{ seriesList.length }}</h2>
  </Teleport>

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
h2 strong {
  color: #5856d6;
  font-size: 40px;
}

input[type="checkbox"] {
  cursor: pointer;
  accent-color: #5856d6;
}

.checkboxes-container {
  max-width: 100%;
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
