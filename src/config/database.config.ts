export default () => ({
    database: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      name: process.env.DB_NAME,
      url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?schema=public`,
    },
  });  