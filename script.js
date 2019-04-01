var svgnest = require('./svgnest')
var svgparser = require('./svgparser')
var fs = require('fs')

var nest = new svgnest.SvgNest()

fs.readFile('img/demo.svg', "utf-8", (err, data)  => {
    nest.parsesvg(data)
    nest.start()
})
