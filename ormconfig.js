module.exports = {
  type: "postgres",
  //url: 'postgres://jzliibea:pNNIq4vKgRzo6BtI6_JJ5dH4y0f8KrTa@balarama.db.elephantsql.com/jzliibea',
  //host: "postgres",
  host: "localhost",
  port: 6432,
  username: "postgres",
  password: "sashkamihaylov.",
  database: "purr_2",
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  factories: ["dist/**/database/factories/**/*.js"],
  seeds: ["dist/**/database/seeds/**/*.js"],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'src/migrations',
  },
}