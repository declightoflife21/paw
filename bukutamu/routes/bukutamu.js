
// Buku tamu Respon 

exports.liatin = function(minta, kasihaja) {
	minta.getConnection(function(err,connect){

		var qry = connect.query('SELECT * FROM guest',function(errn,rows) {

			if (err) {
				console.log('error nya : %s',err);
			};

			kasihaja.render('bukutamu',{page_title:"Data BukuTamu",data:rows});
		});
	})
}

exports.tambah = function(minta, kasihaja) {
	kasihaja.render('add_guest',{page_title:"Tambah BukuTamu"});
}

exports.tambah_simpen = function(minta, kasihaja) {

	var tangkep = JSON.parse(JSON.stringify(minta.body));

	minta.getConnection(function (err, Conn) {
		var post = {

			name_guest : tangkep.nama,
			email_guest : tangkep.email,
			message_guest : tangkep.messages

		};

		var qry = Conn.query("insert into guest set ? ",post,function (err,rows) {
			
			if (err) {
				console.log("Gagal Input Coeg ! :p Error Di : %s",err);
			};

			kasihaja.redirect('/bukutamu');
		})

	});
}

exports.ubah = function(minta, kasihaja) {
	var idnya = minta.params.id;
	minta.getConnection(function (err, Conn) {
		Conn.query("select * from guest where id_guest = ? ",idnya,function (err,rows) {
		if (err) {
				console.log('error nya : %s',err);
			};
			kasihaja.render('edit_guest',{page_title:"Tambah BukuTamu",data:rows});
		}) 
	})


};



exports.ubah_simpen = function(minta, kasihaja) {

	var tangkep = JSON.parse(JSON.stringify(minta.body));
	var idnya = minta.params.id;

	minta.getConnection(function (err, Conn) {
		var post = {

			name_guest : tangkep.nama,
			email_guest : tangkep.email,
			message_guest : tangkep.messages

		};

		var qry = Conn.query("update guest set ? where id_guest = ?",[post,idnya],function (err,rows) {
			
			if (err) {
				console.log("Gagal Update Coeg ! :p Error Di : %s",err);
			};

			kasihaja.redirect('/bukutamu');
		})

	});
}

exports.hapus = function(minta, kasihaja){

		var idnya = minta.params.id;

		minta.getConnection(function (err, Conn) {
			
		var qry = Conn.query("delete from guest where id_guest = ?",idnya,function (err,rows) {
			if (err) {

				console.log("gagal delete coeg ! gara gara : %s",err);

			};
			kasihaja.redirect('/bukutamu');
		});
		})
}


// Terminator Corps
// Fadri