import mysql from 'mysql';
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } from './envConfig';

// Create a MySQL database connection using configuration from envConfig
export const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

// Function to connect to the MySQL database
export const ConnectDB = () => 
    db.connect(function (err) {
        if (err) throw err;
        console.log("MySQL Connected");
    });
