
require('dotenv').config();
const server = require('./api/server');


const PORT = process.env.PORT || 4000; // eslint-disable-line

server.listen(PORT, () => console.log(`Server is running on ${PORT} 👀`));
