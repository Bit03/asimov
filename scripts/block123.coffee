
module.exports = (robot) ->
    
    robot.router.post '/block123/:room', (req, res) ->
        room = req.params.room
        data = if req.body.payload? then JSON.parse req.body.payload else req.body
        robot.logger.info "#{data}"
        robot.messageRoom room, "#{data.email} - #{data.message}"
        res.send "OK"