var users = [];
var messages = [];
var is_user = function(name){
  for(i in users){
    if(name == users[i]){
      return true;
    }
  }
  return false;
}

module.exports = function Routes(app,server){
  var io = require('socket.io').listen(server)
  app.get('/', function(req,res){
    res.render('index')
  })
  io.sockets.on('connection', function(socket){

    socket.on("new_user", function(data){
      if (is_user(data.response)){
        socket.emit('user_exists', { error: "<h2>"+data.response+" already exists</h2>"})
      } else {
        socket.emit('load_messages', { message: messages})
      }
      console.log(JSON.stringify(data))
      socket.emit('user_joined',{response: true})
    })
    
    socket.on('message_sent', function(data){
      messages.push(data)
      io.emit('new_message', {response: data})
      console.log(messages)
    })
  })
}
