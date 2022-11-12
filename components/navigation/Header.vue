<template>
  <div
    class="w-full flex flex-row h-20 bg-gray-300 pl-20 pr-40 justify-between items-center"
  >
    <div class="flex flex-row items-center h-full">
      <NuxtLink
        v-for="link in links"
        :key="link.id"
        :to="link.href"
        class="h-full flex items-center justify-center hover:bg-gray-600 hover:text-white w-32 group"
        ><p class="group-hover:scale-[1.1] duration-[500ms]">
          {{ link.title }}
        </p></NuxtLink
      >
    </div>
    <div>
      <NuxtLink
        class="hover:text-gray-600 text-lg"
        to="/auth"
        v-if="!userNickname"
        >Auth</NuxtLink
      >
      <div v-if="userNickname">
        <NuxtLink class="hover:text-gray-600 text-lg" to="/">{{
          userNickname
        }}</NuxtLink>
        <button class="ml-3" @click="logout">logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { logoutUser } from "~~/composables/useAuth";
export default {
  setup() {
    const userNickname = useState("user")?.value?.nickname || undefined;
    return { userNickname };
  },
  data() {
    return {
      links: [
        {
          id: 1,
          title: "Main",
          href: "/",
        },
        {
          id: 2,
          title: "Publications",
          href: "/publications",
        },
        {
          id: 3,
          title: "Create new",
          href: "/publications/create",
        },
        {
          id: 4,
          title: "My Publications",
          href: "/publications/my",
        },
      ],
    };
  },
  methods: {
    async logout() {
      await logoutUser();
    },
  },
  // computed: {
  //   userNickname() {
  //     //   console.log(useState("user").value, "computed");
  //     return useState("user").value.nickname;
  //   },
  // },
};
</script>
