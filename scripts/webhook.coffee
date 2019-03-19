module.exports = (robot) ->
    robot.router.post '/hubot/chatsecrets/:room', (req, res) ->
        room   = req.params.room
        data   = if req.body.payload? then JSON.parse req.body.payload else req.body
        secret = data.secret
        robot.messageRoom room, "I have a secret: #{secret}"
        res.send 'OK'