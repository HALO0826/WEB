const express =require('express');
require('babel-register');
const config =require( './config')

const createError =require( 'http-errors')
const cookieParser =require( 'cookie-parser')
const logger =require( 'morgan')
const session =require( 'express-session')

const app = express();

// 使用cors解决跨域问题
const cors =require('cors')
app.use(cors());

app.use(cookieParser());

// 使用express-session保存用户登录状况
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: config.maxAge,
    },
}));


// 请求体
const bodyParser =require( 'body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', config.viewsPath);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(config.publicPath));

// catch 404 and forward to error handler
/*app.use((req, res, next) => {
    next(createError(404));
});*/

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const appRoute = require('./routes/routes')(app);
const server = app.listen(config.port, ()=>{
    console.log('listening on port %s...', server.address().port);
});
