toExport = 
    index: (req, res) ->
        id = parseInt req.query.id
        console.log(id)
        info = if !isNaN(id) then "coffee with #{id}" else "Please enter a valid id"
        res.render 'coffee', { info: info }

module.exports = toExport
