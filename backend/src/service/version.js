module.exports = app => {
  class Version extends app.Service {

    async update(options) {
      // eslint-disable-next-line
      if (options.version === 1) {}
    }

    async init(options) {
      if (options.version === 1) {}
    }

  }

  return Version;
};
