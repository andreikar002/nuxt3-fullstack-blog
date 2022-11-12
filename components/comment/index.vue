<template>
  <div class="w-full flex flex-col" v-if="comment">
    <div class="flex flex-row w-full items-center justify-between px-3">
      <p>
        <b>{{ "By: " + comment.author.nickname }}</b>
      </p>
      <p>
        <i>{{ normalizedDate }}</i>
      </p>
    </div>
    <p class="px-3">{{ comment.text }}</p>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    normalizedDate() {
      return moment(this.comment.createdAt).format("DD.MM.YYYY");
    },
  },
};
</script>
