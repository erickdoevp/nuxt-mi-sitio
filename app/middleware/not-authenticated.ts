export default defineNuxtRouteMiddleware((to) => {

  const { isLoggedIn } = useAuth();

  if(to.path.startsWith('/login') && isLoggedIn.value) {
    return navigateTo('/');
  }

  if(to.path.startsWith('/register') && isLoggedIn.value) {
    return navigateTo('/');
  }

});