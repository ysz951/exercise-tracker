module.exports = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://dontforget_server@localhost/dontforget",
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || "postgresql://dontforget_server@localhost/dontforget-test",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
    ATLAS_URI: process.env.ATLAS_URI
  };