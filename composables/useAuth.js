import { useRouter, useState } from "#app";

export const useAuthCookie = () => useCookie("auth_token");

export async function useUser() {
  const authCookie = useCookie("auth_token").value;
  const user = useState("user");
  if (authCookie && !user.value) {
    const data = await useAPI("/api/auth/getByAuthToken");
    if (data) user.value = data;
  }
  return user.value;
}

export async function logoutUser() {
  await useAPI("/api/auth/logout");
  const user = useState("user");
  user.value = null;
  await useRouter().push({ path: "/auth" });
  location.reload();
}

export async function loginUser(form) {
  const user = useState("user");
  try {
    const res = await useAPI("/api/auth/login", {
      method: "POST",
      body: form,
    });
    user.value = res;
    await useRouter().push({ path: "/" });
    location.reload();
  } catch (e) {
    console.log(e.toString(), "error in useAuth");
  }
}

export async function registerUser(form) {
  const user = useState("user");
  try {
    const res = await useAPI("/api/auth/register", {
      method: "POST",
      body: form,
    });
    user.value = res;
    await useRouter().push({ path: "/" });
    location.reload();
  } catch (e) {
    console.log(e.toString(), "error in useAuth");
  }
}

export function isAuthorized() {
  const user = useState("user").value;
  if (user) return true;
  const token = useCookie("auth_token").value;
  if (token) return true;
  return false;
}
