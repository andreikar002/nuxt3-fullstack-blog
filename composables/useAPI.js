export async function useAPI(url, options) {
  if (!options) options = {};
  const authToken = useCookie("auth_token").value;
  if (authToken) {
    options.headers = useRequestHeaders(["cookie"]);
  }
  return await $fetch(url, options);
}
