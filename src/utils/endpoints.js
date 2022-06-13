const usersRoot = "/users";
const endpoints = {
  users: {
    root: usersRoot,
    register: `${usersRoot}/register`,
    login: `${usersRoot}/login`,
  },
};

module.exports = endpoints;
