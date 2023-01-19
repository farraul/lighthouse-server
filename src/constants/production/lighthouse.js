module.exports = {
    port: 9001,
    storage: {
        storageMethod: process.env.NODE_ENV,
        sqlDialect: process.env.SQL_DIALECT,
        sqlConnectionSsl: process.env.SQL_CONNECTION_SSL,
        sqlConnectionUrl: process.env.SQL_CONNECTION_URL,
    }
}