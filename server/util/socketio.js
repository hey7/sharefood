var socketio = {};
var socket_io = require('socket.io');

socketio.users = {};
//获取io
socketio.getSocketio = function (server) {

	var io = socket_io.listen(server);

	io.sockets.on('connection', function (socket) {
		console.log('sockets连接成功');

		socket.on('new comment', function (from, to, msg) {
			if (to in socketio.users) {
				socketio.users[to].emit('notification', {
					from: from,
					msg: msg
				});
			}
		});

		socket.on('new user', function (data) {
			// if (data in socketio.users) {} else {
			var user_id = data;
			socketio.users[user_id] = socket;
			// }
			// socket.emit('click2', 1)
			console.info('进入',Object.keys(socketio.users));
		});

		socket.on('del user', function (data) {
			// if (data in socketio.users) {} else {
			var user_id = data;

			delete socketio.users[user_id] 
		
			// }
			// socket.emit('click2', 1)
			console.info('退出',Object.keys(socketio.users));
		});

		// socket.on('click1', function () {
		// 	console.log('监听点击事件');
		// 	var datas = [1, 2, 3, 4, 5];
		// 	socket.emit('click2', {
		// 		datas: datas
		// 	});
		// 	socket.broadcast.emit('click2', {
		// 		datas: datas
		// 	});
		// })
	})


};

module.exports = socketio;