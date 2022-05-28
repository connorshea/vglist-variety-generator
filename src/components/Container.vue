<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import VarietyList from './VarietyList.vue'

type GamePurchase = {
  game: {
    id: string,
    series?: {
      id: string
    }
  },
  completionStatus: string
};

interface Props {
  clientId: string
  redirectUri: string
}

const props = defineProps<Props>();

let accessToken: Ref<string | null> = ref(null);
let gamePurchases: Ref<GamePurchase[]> = ref([]);
const authenticated = ref(false);
const requestsCompleted = ref(false);
const loading = ref(false);
const username: Ref<string | null> = ref(null);

const getAccessToken = (authorizationCode: string) => {
  const url = 'https://vglist.co/settings/oauth/token';
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: props.clientId,
      code: authorizationCode,
      redirect_uri: props.redirectUri
    })
  }

  fetch(url, options)
    .then(response => response.json())
    .then(data => setAccessToken(data));
};

const setAccessToken = (data: any) => {
  if (!data.error) {
    accessToken.value = data.access_token
    authenticated.value = true;
    populateGamePurchases();
  }
  else {
    console.log("Invalid authorization token")
  }
};

// TODO: Remove `code` from the URL after storing it, and use localStorage to
// cache the token until it expires.
const codeInUrl = computed(() => window.location.href.match(/code=(.*)/));
if (codeInUrl.value !== null) {
  let authorizationCode = codeInUrl.value[1];
  getAccessToken(authorizationCode);
} else {
  console.log('No authorization code found in URL.');
}

const gamePurchasesQuery = `
  query($startCursor: String) { 
    currentUser {
      username
      gamePurchases(after: $startCursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          game {
            id
            series {
              id
            }
          }
          completionStatus
        }
      }
    }
  }
`;

let startCursor: Ref<string | null> = ref(null);
let variables = computed(() => ({ startCursor: startCursor.value }));

const populateGamePurchases = () => {
  loading.value = true;

  let url = 'https://vglist.co/graphql';
  let options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: gamePurchasesQuery,
      variables: variables.value
    })
  };

  // Make the HTTP API request
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${ response.status }`);
      }

      return response.json();
    }).then(queryJson => {
      if (username.value === null) {
        username.value = queryJson.data.currentUser.username;
      }
      gamePurchases.value = gamePurchases.value.concat(queryJson.data.currentUser.gamePurchases.nodes);
      let pageInfo = queryJson.data.currentUser.gamePurchases.pageInfo;
      startCursor.value = pageInfo.endCursor;
      if (pageInfo.hasNextPage) {
        // Throttle the requests so it doesn't spam the GraphQL endpoint.
        setTimeout(() => {
          populateGamePurchases();
        }, 500);
      } else {
        requestsCompleted.value = true;
        loading.value = false;
      }
    });
};

const gameSeriesInLibrary = computed(() => {
  // Return early so we don't try to compute this dozens of times while we're loading the game purchases.
  if (!requestsCompleted.value) {
    return [];
  }
  let seriesIds = gamePurchases.value.map((gamePurchase) => gamePurchase.game.series?.id ?? null)
                                     .filter((seriesId) => seriesId !== null);
  // Filter out duplicate values by abusing the Set class.
  return [...new Set(seriesIds as string[])];
});
</script>

<template>
  <Teleport to="#connect-container">
    <a class="vglist-connect-link align-right" v-if="!authenticated" :href="`https://vglist.co/settings/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`">
      <button class="vglist-connect-button">Connect your vglist account</button>
    </a>
    <p class="align-right align-center-mobile" v-else-if="username !== null">
      Logged in as {{ username }}
    </p>
  </Teleport>

  <p v-if="loading">Loading games...</p>

  <VarietyList
    :game-series-in-library="gameSeriesInLibrary"
    :requests-completed="requestsCompleted"
    :loading="loading"
  />
</template>

<style scoped lang="scss">

</style>
