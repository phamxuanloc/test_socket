/**
 * Created by Yamon-PC on 24-Aug-16.
 */
var mysql    = require("mysql");
var http     = require('http'),
	socketIO = require('socket.io'),

	port     = 8080,
	ip       = '127.0.0.1',

	server   = http.createServer().listen(port, ip, function() {
		console.log('Socket.IO server started at %s:%s!', ip, port);
	}),

	io       = socketIO.listen(server);
io.set('match origin protocol', true);
// io.set('origins', '*:*');
var con = mysql.createConnection({
	host    : "localhost",
	user    : "root",
	password: "",
	database: "cydeco"
});

con.connect(function(err) {
	if(err) {
		console.log('Error connecting to Db');
		return;
	}
	console.log('Connection established');
});

// con.end(function(err) {
// 	// The connection is terminated gracefully
// 	// Ensures all previously enqueued queries are still
// 	// before sending a COM_QUIT packet to the MySQL server.
// });

var run = function(socket) {
	con.query('SELECT * FROM user', function(err, rows) {
		if(err) {
			throw err;
		}

		console.log('Data received from Db:\n');
		for (var i = 0; i < rows.length; i++) {
			console.log(rows[i].username);
			socket.emit('greeting', rows[i].username);
		}
	});
	// Socket process here!!!
	
	socket.on('user-join', function(data) {
		// console.log('User %s have joined', data);
		socket.emit('new-user', data);

	})
};

io.sockets.on('connection', run);
