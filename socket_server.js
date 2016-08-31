/**
 * Created by Yamon-PC on 24-Aug-16.
 */
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
var run = function(socket) {
	// Socket process here!!!
	socket.emit('greeting', 'Hello from Socket.IO server');
	socket.on('user-join', function(data) {
		// console.log('User %s have joined', data);
		socket.emit('new-user', data);

	})
};

io.sockets.on('connection', run);
