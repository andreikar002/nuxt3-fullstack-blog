<template>
  <div class="flex flex-col items-center mb-10">
    <h1 class="mt-10 text-xl font-semibold">Publications</h1>
    <div class="mt-7 flex flex-col items-center gap-4">
      <Publication
        v-for="publication in publications"
        :key="publication.id"
        :publication="publication"
      />
    </div>
  </div>
</template>

<script>
import { getPublicationsByAuthor } from "~~/composables/usePublication";

export default {
  data() {
    return {
      publications: [],
    };
  },
  async mounted() {
    this.publications = await getPublicationsByAuthor(this.$route.params.author);
  },
};
definePageMeta({
  middleware: ["check-auth"],
});
</script>
