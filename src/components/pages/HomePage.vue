<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app.ts";
import tenantService from "@/services/tenantService.ts";
import loggerService from "@/services/loggerService.ts";

const logoUrl = tenantService.getImgAsset("logo.svg");
const { t } = useI18n();
const appStore = useAppStore();
</script>

<template>
  <div>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="logoUrl" class="logo vue" alt="Logo" />
    </a>
  </div>
  <h1>{{ t("message") }}</h1>
  <div class="card">
    <div>
      Tenant is: {{ appStore.tenant }}<br />
      Production monde: {{ appStore.productionMode }}<br />
      Current 18n locale is: {{ appStore.language }}<br />
      Example translation: {{ t("current_i18n_locale") }}<br />

      <div>
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
      </div>

      <a @click="loggerService.error('dummy error')">Log error</a><br />
      <a @click="loggerService.info('dummy info')">Log info</a><br />
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
