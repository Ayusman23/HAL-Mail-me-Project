const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors');

connectDb();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Use emailRoutes instead of contactRoutes
app.use("/api/emails", require("./routes/emailRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/templates", require("./routes/templateRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
