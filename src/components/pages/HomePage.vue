<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app.ts";
import { useDataStore } from "@/stores/data.ts";
import * as tenantService from "@/services/tenantService.ts";
import { onBeforeMount } from "vue";
import { ref } from "vue";

// const logoUrl =await tenantService.getImgAsset("logo.svg");
const logoUrl = ref("");
const { t } = useI18n();
const appStore = useAppStore();
const dataStore = useDataStore();

onBeforeMount(async () => {
  logoUrl.value = await tenantService.getSvgAssetUrl("logo");
});
</script>

<template>
  <div>
    <img class="logo vue" alt="Logo" :src="logoUrl" />
  </div>
  <h1 class="custom-title">{{ t("message") }}</h1>
  <div class="card">
    <div>
      <p>
        Tenant is: <b>{{ appStore.tenant }}</b
        ><br />
        Production monde: <b>{{ appStore.productionMode }}</b
        ><br />
        Current 18n locale is: <b>{{ appStore.language }}</b
        ><br />
        Inherited translation: <b>{{ t("current_i18n_locale") }}</b
        ><br />
        Ternant translation: <b>{{ t("merged_i18n_locale") }}</b
        ><br />
      </p>

      <p>
        <a @click="appStore.changeLanguage('it')">
          <img
            src="@/assets/img/flags/it.png"
            class="flag"
            alt="italian language"
          />
        </a>
        <a @click="appStore.changeLanguage('en')">
          <img
            src="@/assets/img/flags/en.png"
            class="flag"
            alt="english language"
          />
        </a>
        <a @click="appStore.changeLanguage('es')">
          <img
            src="@/assets/img/flags/es.png"
            class="flag"
            alt="spanish language"
          />
        </a>
      </p>

      <p>
        <a @click="dataStore.fetchUsers"> get data </a>
      </p>

      <p v-if="dataStore.isLoading">Loading...</p>
      <div v-else>
        <div v-for="user in dataStore.users" :key="user.id">
          {{ user.name }} - {{ user.email }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.flag {
  height: 2em;
  padding: 0.5em;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em rgb(255, 255, 255));
}
</style>
