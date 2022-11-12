<template>
  <div class="w-full flex items-center justify-center mt-10">
    <div
      class="border border-gray-500 shadow-white shadow-lg rounded-xl w-72 flex flex-col items-start gap-5 px-5 py-5"
    >
      <div class="flex flex-col items-start gap-5 w-full">
        <p>Login</p>
        <input
          v-model="form.email"
          placeholder="email"
          class="border rounded-lg px-3 py-2 w-full"
        />
        <input
          v-model="form.password"
          placeholder="password"
          type="password"
          class="border rounded-lg px-3 py-2 w-full"
        />
      </div>
      <div class="flex flex-col items-start gap-5 w-full">
        <div class="flex flex-col gap-2 text-sm text-gray-700">
          <NuxtLink to="/">Forgot ypur password?</NuxtLink>
          <NuxtLink to="/auth/register">Register</NuxtLink>
        </div>
        <button
          class="bg-gray-700 w-full py-2 rounded-lg text-gray-200 text-lg hover:text-white hover:bg-gray-800 transition-[500ms]"
          @click="login"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from "~~/composables/useAuth.js";
export default {
  data() {
    return {
      form: {},
      registerForm: {},
    };
  },
  methods: {
    async login() {
      await loginUser(this.form);
    },
  },
};
</script>
