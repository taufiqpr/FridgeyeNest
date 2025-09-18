export const CONFIG_KEYS = {
    APP: {
      PORT: 'app.port',
      NODE_ENV: 'app.nodeEnv',
    },
    DB: {
      HOST: 'database.host',
      PORT: 'database.port',
      USER: 'database.user',
      PASS: 'database.pass',
      NAME: 'database.name',
      URL: 'database.url',
    },
    JWT: {
      SECRET: 'jwt.secret',
      EXPIRES_IN: 'jwt.expiresIn',
    },
  } as const;
  