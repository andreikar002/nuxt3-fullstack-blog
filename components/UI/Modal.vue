<template>
  <div>
    <transition name="fade">
      <div
        class="h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.6)] fixed modal-outclick top-0 left-0 flex items-center justify-center"
        v-if="isShow"
      >
        <div
          class="bg-white border shadow-md shadow-white rounded-xl py-2 max-w-[50vw]"
        >
          <div>
            <h2 class="px-4">{{ title }}</h2>
            <hr class="w-full h-0.5 bg-gray-700 mt-2" />
          </div>
          <div class="px-4 mt-3">
            <slot name="content">
              <p>slot for content</p>
            </slot>
          </div>
        </div>
      </div></transition
    >
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    window.document.addEventListener("click", (event) => {
      if (event.target.className?.includes("modal-outclick")) {
        this.$emit("close-modal");
        console.log("close-modal");
      }
    });
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 0.15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
