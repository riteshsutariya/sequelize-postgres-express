const { dbClient } = require("../db/index");

const checkDBConnection = async () => {
  try {
    await dbClient.authenticate();
    console.log(`database connection successfull.`);
  } catch (error) {
    console.error(`unable to connect to the database: ${error}`);
    process.exit(1);
  }
};

module.exports = checkDBConnection;
