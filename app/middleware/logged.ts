export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.getSession();

  if (session && to.path !== "/user/dashboard") {
    return navigateTo("/user/dashboard");
  }
});
