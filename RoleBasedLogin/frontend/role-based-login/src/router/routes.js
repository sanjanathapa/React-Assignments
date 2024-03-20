const APP_PREFIX = "/app";

const routes = {
  app: {
    login: `${APP_PREFIX}/login`,
    forgotPwd: `${APP_PREFIX}/forgot-password`,
    changePwd: `${APP_PREFIX}/change-password`,
    home: `${APP_PREFIX}/home`,
    dashboard: `${APP_PREFIX}/dashboard`,
    settings: `${APP_PREFIX}/settings`,
    help: `${APP_PREFIX}/help`,
    profile: `${APP_PREFIX}/profile`,
    test: `${APP_PREFIX}/test`,
    userForm: `${APP_PREFIX}/userform`,
  },
};

export default routes;
