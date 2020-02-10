module.exports = {
  database: process.env.DATABASE || '',
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || '',
  host: process.env.HOST,
  dialect: 'postgres',
  define: {
    timestamps: 'true',
    underscored: 'true',
    underscoredAll: 'true',
  },
};
