module.exports = {
  database: 'fastfeet',
  username: 'postgres',
  password: 'docker',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  define: {
    timestamps: 'true',
    underscored: 'true',
    underscoredAll: 'true',
  },
};
