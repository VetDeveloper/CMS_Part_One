module.exports = {
  type: "postgres",
  url: 'postgres://grjphkjf:VwdLpZBeLymSito-74m26oBPcIXoA7Al@hattie.db.elephantsql.com/grjphkjf',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  factories: ["dist/**/database/factories/**/*.js"],
  seeds: ["dist/**/database/seeds/**/*.js"],
  migrations: ["dist/migrations/*.js"],
  migrationsTableName: "migrations",
  cli: {
        "migrationsDir": "src/migrations"
  }
}