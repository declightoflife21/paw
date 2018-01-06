var http = require('http');
var express = require('express');
var path = require('path');

var webdonasi = require('./routes/webdonasi');
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
			database:'webdonasi'


		},'single')
	);

app.get('/webdonasi',webdonasi.liatin);
app.get('/webdonasi/tambah',webdonasi.tambah);
app.post('/webdonasi/tambah',webdonasi.tambah_simpen);
app.get('/webdonasi/ubah/:id',webdonasi.ubah);
app.post('/webdonasi/ubah/:id',webdonasi.ubah_simpen);
app.get('/webdonasi/hapus/:id',webdonasi.hapus);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server Is Running On Port : ' + app.get('port'));
});