import express from 'express';
import { ConnectDB } from './config/dbConfig';
import { SERVER_PORT } from './config/envConfig';
import { cronStart } from './utils/cronNotification';

import authRoute from "./routes/auth.route";
import birthRoute from "./routes/birthday.route";

// Connect MySQL Database
ConnectDB();

// Start Cron Notification
cronStart();

const app = express();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/api/auth', authRoute);
app.use('/api/birthday', birthRoute);

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));