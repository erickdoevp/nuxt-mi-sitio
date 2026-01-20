
export const useAuth = () => {

  const { loggedIn, session, user, clear, fetch } = useUserSession();

  const login = async (email: string, password: string) => {

    try {

      await $fetch('/api/login', {
        method: 'POST',
        body: { email, password }
      });

      await fetch();

      navigateTo('/?message=Login successful');

      return true;

    } catch(error) {
      return false;
    }
  }

  const register = async (fullName: string, email: string, password: string) => {

    const register = await $fetch('/api/register', {
      method: 'POST',
      body: { fullName, email, password }
    });

    navigateTo('/login?message=Registration successful, please log in');

    return true;

  };

  const logout = async () => {
    await clear();
    navigateTo('/?message=Logged out successfully');
  };

  return {
    loggedIn,
    session,
    user,
    fetch,
    login,
    register,
    logout,

    isLoggedIn: loggedIn,
    isAdmin: computed(() => user.value?.roles.includes('admin'))

  }
};