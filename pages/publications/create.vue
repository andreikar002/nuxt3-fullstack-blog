<template>
  <div class="w-full flex items-center justify-center mt-20">
    <template v-if="isAuthorized()">
      <div
        class="border border-gray-500 shadow-white shadow-lg rounded-xl w-96 flex flex-col items-start gap-5 px-5 py-5 col-start-5 col row-start-5 row-end-8"
      >
        <div class="flex flex-col items-start gap-5 w-full">
          <p>New publication</p>
          <input
            v-model="form.title"
            placeholder="title"
            class="border rounded-lg px-3 py-2 w-full"
          />
          <textarea
            v-model="form.text"
            placeholder="content"
            class="border rounded-lg px-3 py-2 w-full h-32"
          />
        </div>
        <div class="flex flex-col items-start gap-5 w-full">
          <button
            @click="addPublication"
            class="bg-gray-700 w-full py-2 rounded-lg text-gray-200 text-lg hover:text-white hover:bg-gray-800 transition-[500ms]"
          >
            Create
          </button>
        </div>
      </div></template
    >
    <template v-else
      ><p class="text-xl font-bold mt-10" align="center">
        You are not authorized<br />
        Log in to create your publications
      </p></template
    >
  </div>
</template>

<script>
import { createPublication } from "~~/composables/usePublication";

export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    async addPublication() {
      const data = await createPublication(this.form);
      if (data) this.$router.push({ path: "/publications/" });
    },
  },
};
definePageMeta({
  middleware: ["check-auth"],
});
</script>
