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
import { getAllPublications } from "~~/composables/usePublication";

export default {
  data() {
    return {
      publications: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
    };
  },
  async mounted() {
    this.publications = await getAllPublications();
  },
};

definePageMeta({
  middleware: ["check-auth"],
});
</script>
