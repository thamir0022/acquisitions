export const Cookie = {
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
  }),

  get: (req, name) => {
    return req.cookies[name];
  },

  set: (res, name, value, options = {}) => {
    res.cookie(name, value, { ...Cookie.getOptions(), ...options });
  },

  clear: (res, name, options = {}) => {
    res.cookie(name, { ...this.getOptions(), ...options });
  },
};
