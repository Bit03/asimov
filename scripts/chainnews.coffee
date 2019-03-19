# Commands:
#   hubot news <city> - 获取链闻最近 5 条新闻.
#
# Author:
#   jiaxin



module.exports = (robot) ->
    robot.respond /news/i, (msg) -> 
        msg.http("https://api.chainnews.com/api/news.json?size=5")
            .header('Accept', 'application/json')
            .get() (err, r, body) -> 
                news = ""
                if r.statusCode isnt 200
                    res.send "Request didn't come back HTTP 200 :("
                    return
                data = JSON.parse body
                robot.logger.info(data)
                data.results.forEach (item) ->
                    robot.logger.info(item)
                    news += "#{item.title} - #{item.refer_link}\n"
                msg.send "#{news}"


    robot.router.post '/chainnews/news/:room', (req, res) ->
        room   = req.params.room
        data   = if req.body.payload? then JSON.parse req.body.payload else req.body
        secret = data.secret
        robot.messageRoom room, "I have a secret: #{secret}"
        res.send 'OK'