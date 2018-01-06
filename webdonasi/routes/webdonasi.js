
// Buku tamu Respon 

exports.liatin = function(minta, kasihaja) {
	minta.getConnection(function(err,connect){

		var qry = connect.query('SELECT * FROM campaign',function(errn,rows) {

			if (err) {
				console.log('error nya : %s',err);
			};

			kasihaja.render('webdonasi',{page_title:"Data Campaign",data:rows});
		});
	})
}

exports.tambah = function(minta, kasihaja) {
	kasihaja.render('add_campaign',{page_title:"Add Campaign"});
}

exports.tambah_simpen = function(minta, kasihaja) {

	var tangkep = JSON.parse(JSON.stringify(minta.body));

	minta.getConnection(function (err, Conn) {
		var post = {

			id_cpg : tangkep.id_cpg1,
			judul_cpg : tangkep.judul_cpg1,
			foto_cpg : tangkep.foto_cpg1,
			desc_cpg : tangkep.desc_cpg1,
			start_cpg : tangkep.start_cpg1,
			deadline_cpg : tangkep.deadline_cpg1,
			target_cpg : tangkep.target_cpg1,
			income_cpg : tangkep.income_cpg1		

		};

		var qry = Conn.query("insert into campaign set ? ",post,function (err,rows) {
			
			if (err) {
				console.log("Gagal Input  ! :p Error Di : %s",err);
			};

			kasihaja.redirect('/webdonasi');
		})

	});
}

exports.ubah = function(minta, kasihaja) {
	var idnya = minta.params.id;
	minta.getConnection(function (err, Conn) {
		Conn.query("select * from guest campaign id_cpg = ? ",idnya,function (err,rows) {
		if (err) {
				console.log('error nya : %s',err);
			};
			kasihaja.render('edit_guest',{page_title:"Edit ",data:rows});
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

			kasihaja.redirect('/webdonasi');
		})

	});
}

exports.hapus = function(minta, kasihaja){

		var idnya = minta.params.id;

		minta.getConnection(function (err, Conn) {
			
		var qry = Conn.query("delete from campaign where id_cpg = ?",idnya,function (err,rows) {
			if (err) {

				console.log("gagal delete coeg ! gara gara : %s",err);

			};
			kasihaja.redirect('/webdonasi');
		});
		})
}


// Terminator Corps
// Fadri