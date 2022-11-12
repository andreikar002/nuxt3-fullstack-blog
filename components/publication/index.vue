<template>
  <div class="border rounded-xl px-3 py-3 w-[720px]">
    <div class="w-full flex flex-row justify-between">
      <p>
        <i>{{ publication.title }}</i>
      </p>
      <p v-if="publication.createdAt">{{ normalizedDate }}</p>
    </div>
    <p class="mt-3">{{ publication.text }}</p>
    <div class="mt-2 w-full flex flex-row justify-between">
      <NuxtLink v-if="publication.author" :to="'/publications/author/' + publication.author.nickname">
        <b>{{ publication.author.nickname }}</b>
      </NuxtLink>
      <NuxtLink :to="'/publications/' + publication.id">A</NuxtLink>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    publication: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    normalizedDate() {
      return moment(this.publication.createdAt).format("DD.MM.YYYY");
    },
  },
};
</script>
