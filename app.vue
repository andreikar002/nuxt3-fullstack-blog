<template>
  <div>
    <NuxtLayout><NuxtPage /></NuxtLayout>
  </div>
</template>

<script setup>
import { useUser } from "~~/composables/useAuth";
const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});

await useUser();
</script>
