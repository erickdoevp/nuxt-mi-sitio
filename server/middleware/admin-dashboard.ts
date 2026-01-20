export default defineEventHandler(async (event) => {
  console.log('new request'+getRequestURL(event));

  if(!event.path.startsWith('/api/admin')) {
    return;
  } else {

    const session = await requireUserSession(event);
    const hasAdminRole = session.user.roles.includes('admin');

    if(!hasAdminRole) throw createError({
      statusCode: 401,
      message: 'Unauthorize'
    });

  }
});