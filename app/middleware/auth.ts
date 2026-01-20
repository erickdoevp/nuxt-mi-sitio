export default defineNuxtRouteMiddleware((to) => {    

  const { isLoggedIn, isAdmin } = useAuth();
  
  if(!isLoggedIn.value) {
    return navigateTo('/login');
  }

  if(to.path.startsWith('/dashboard') && !isAdmin.value) {
    return navigateTo('/');
  }

});