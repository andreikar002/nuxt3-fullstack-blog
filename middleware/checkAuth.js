export default defineNuxtRouteMiddleware(() => {
  const auth_token = useCookie("auth_token");
  console.log(auth_token);
  var isAuth = auth_token || false;
  // console.log(isAuth, "isAuth");
  if (!isAuth) {
    return navigateTo("/auth");
  }
});
