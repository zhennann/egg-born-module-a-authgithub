const require3 = require('require3');
const strategy = require3('passport-github').Strategy;
module.exports = app => {
  const moduleInfo = app.meta.mockUtil.parseInfoFromPackage(__dirname);
  const provider = moduleInfo.name;
  return {
    providers: {
      [provider]: {
        meta: {
          title: 'GitHub',
          mode: 'redirect',
          component: 'button',
        },
        config: {
          clientID: '[required]',
          clientSecret: '[required]',
        },
        handler: app => {
          return {
            strategy,
            callback: (req, accessToken, refreshToken, params, profile, done) => {
              const user = {
                module: moduleInfo.relativeName,
                provider,
                profileId: profile.id,
                profile: {
                  userName: profile.username,
                  realName: profile.displayName,
                  avatar: profile.photos && profile.photos[0] && profile.photos[0].value,
                  accessToken,
                  refreshToken,
                  params,
                  profile,
                },
              };
              app.passport.doVerify(req, user, done);
            },
          };
        },
      },
    },
  };
};
