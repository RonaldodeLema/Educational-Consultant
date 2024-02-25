import express, { json, urlencoded } from 'express';
import createError from 'http-errors';
import { dirname, join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();


// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use(session({
    secret: process.env.SECRET_SS || `thisismysecret`,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 259_200_000 }
}));

const whitelist = ['http://localhost:4001', 'http://add-the-other-here.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,        
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4001");
//     res.header("Access-Control-Allow-Credentials", req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     next();
// });

app.use('/users', usersRouter);
app.use('/', indexRouter);

app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

export default app;