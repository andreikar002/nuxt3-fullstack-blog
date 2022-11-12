<template>
  <div class="flex items-center justify-center mt-10">
    <div
      class="border border-gray-500 shadow-white shadow-lg rounded-xl w-72 flex flex-col items-start gap-5 px-5 py-5 col-start-9 row-start-3 row-end-[6]"
    >
      <p>Register</p>
      <input
        v-model="registerForm.email"
        placeholder="email"
        class="border rounded-lg px-3 py-2 w-full"
      />
      <input
        v-model="registerForm.nickname"
        placeholder="nickname"
        class="border rounded-lg px-3 py-2 w-full"
      />
      <input
        v-model="registerForm.password"
        placeholder="password"
        type="password"
        class="border rounded-lg px-3 py-2 w-full"
      />
      <input
        v-model="registerForm.password_confirmation"
        placeholder="confirm password"
        type="password"
        class="border rounded-lg px-3 py-2 w-full"
      />
      <div class="flex flex-col items-start gap-2 w-full">
        <div class="flex flex-col gap-2 text-sm text-gray-700">
          <NuxtLink to="/auth">Login</NuxtLink>
        </div>
        <button
          class="bg-gray-700 w-full py-2 rounded-lg text-gray-200 text-lg hover:text-white hover:bg-gray-800 transition-[500ms]"
          @click="register"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from "~~/composables/useAuth.js";

export default {
  data() {
    return {
      registerForm: {
        email: "",
        nickname: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    async register() {
      await registerUser(this.registerForm);
    },
  },
};
</script>
