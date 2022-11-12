<template>
  <div class="flex flex-col items-center mb-10">
    <template v-if="isAuthorized()">
      <h1 class="mt-10 text-xl font-semibold">Publications</h1>
      <div
        class="mt-7 flex flex-col items-center gap-4"
        v-if="publications.length"
      >
        <Publication
          v-for="publication in publications"
          :key="publication.id"
          :publication="publication"
        />
      </div>
      <div v-else>
        <p class="text-gray-700 text-[17px] font-semibold" align="center">
          <i>There are not your posts yet.<br />Create your first post</i
          ><br /><b><NuxtLink to="/publications/create">Create</NuxtLink></b>
        </p>
      </div></template
    ><template v-else
      ><p class="text-xl font-bold mt-10" align="center">
        You are not authorized<br />
        Log in to see your publications
      </p></template
    >
  </div>
</template>

<script>
import { getMyPublications } from "~~/composables/usePublication";

export default {
  data() {
    return {
      publications: [],
    };
  },
  async mounted() {
    this.publications = await getMyPublications();
  },
};
definePageMeta({
  middleware: ["check-auth"],
});
</script>
