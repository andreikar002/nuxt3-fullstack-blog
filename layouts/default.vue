<template>
  <div class="min-h-[100vh] flex flex-col justify-between">
    <NavigationHeader />
    <div
      class="grow"
      style="
        background: linear-gradient(to right, rgb(107, 114, 128), rgb(209, 213, 219));
      "
    >
      <slot />
    </div>
    <NavigationFooter />
  </div>
</template>
