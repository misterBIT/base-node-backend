const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')

const app = express()

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://127.0.0.1:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}

const logger = require('./services/logger.service')
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});
