const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//Express Config
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
    secret: 'hi tom $ naama',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const eventoRoutes = require('./api/evento/evento.routes')
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const reviewRoutes = require('./api/review/review.routes')
const connectSockets = require('./api/socket/socket.routes')

// routes
app.use('/api/evento', eventoRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
connectSockets(io)

// Logging
const logger = require('./services/logger.service')
const port = process.env.PORT || 3000;

//app.listen
http.listen(port, () => {
    logger.info('Server is running on port: ' + 'http://localhost:'+port)
    console.log('Server is running on port: ' + 'http://localhost:'+port)
    console.log ( `App listening on port ${ port } !`)
});