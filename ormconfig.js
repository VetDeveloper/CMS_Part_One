module.exports = {
  type: "postgres",
  url: 'postgres://jzliibea:pNNIq4vKgRzo6BtI6_JJ5dH4y0f8KrTa@balarama.db.elephantsql.com/jzliibea',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  factories: ["dist/**/database/factories/**/*.js"],
  seeds: ["dist/**/database/seeds/**/*.js"]
}