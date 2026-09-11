export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.getSession();

  if (session && (to.path === "/user/login" || to.path === "/user/register")) {
    return navigateTo("/user/dashboard");
  } else if (!session && to.path.startsWith("/user/dashboard")) {
    return navigateTo("/user/login");
  }
});
