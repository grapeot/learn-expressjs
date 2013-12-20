toExport = 
    index: (req, res) ->
        res.render 'coffee', { info: 'coffee' }

module.exports = toExport
