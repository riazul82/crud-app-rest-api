const app = require('./app');
require('dotenv').config();
require('./config/db');

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});