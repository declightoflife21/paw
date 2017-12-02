var http = require('http');
var express = require('express');
var path = require('path');

var bukutamu = require('./routes/bukutamu');
var app =express();

var conn = require('express-myconnection');
var mysql = require('mysql');

app.set('port',process.env.PORT || 2308);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'assets')));

if ('development' - app.get('env')) {
	app.use(express.errorHandler());
};

app.use(
		conn(mysql,{

			host: '127.0.0.1',
			user: 'root',
			password: '',
			port: 3306,
			database:'db_njs_lat_bukutamu'


		},'single')
	);

app.get('/bukutamu',bukutamu.liatin);
app.get('/bukutamu/tambah',bukutamu.tambah);
app.post('/bukutamu/tambah',bukutamu.tambah_simpen);
app.get('/bukutamu/ubah/:id',bukutamu.ubah);
app.post('/bukutamu/ubah/:id',bukutamu.ubah_simpen);
app.get('/bukutamu/hapus/:id',bukutamu.hapus);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server Is Running On Port : ' + app.get('port'));
});