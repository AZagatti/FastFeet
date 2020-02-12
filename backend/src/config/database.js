const { DATABASE, USERNAME, PASSWORD, HOST } = process.env;

if (!DATABASE) {
  throw new Error('DATABASE not exists');
}
if (!USERNAME) {
  throw new Error('USERNAME not exists');
}
if (!PASSWORD) {
  throw new Error('PASSWORD not exists');
}
if (!HOST) {
  throw new Error('HOST not exists');
}

module.exports = {
  database: DATABASE,
  username: USERNAME,
  password: PASSWORD,
  host: HOST,
  dialect: 'postgres',
  define: {
    timestamps: 'true',
    underscored: 'true',
    underscoredAll: 'true',
  },
};
