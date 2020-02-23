const GeometryUtil = require('./geometryutil')

var A = [{"x": 106, "y": 125}, {"x": 0.0, "y": 125}, {"x": 0.0, "y": 0.0}, {"x": 106, "y": 0.0}]
var B = [{"x": -117, "y": 106}, {"x": -117, "y": 87}, {"x": -99, "y": 87}, {"x": -99, "y": 106}]
// nfp = [[{"x": 0.0, "y": 18.89881200000002}, {"x": 89.20238299999998, "y": 18.89881200000002}, {"x": 89.20238299999998, "y": 125.48809300000002}, {"x": 0.0, "y": 125.48809300000002}]]


// var nfp = GeometryUtil.searchStartPoint(A, B, true, true)
// var startPoint = GeometryUtil.searchStartPoint(A, B, true)

B.offsetx = 205
B.offsety = 19

var intersect = GeometryUtil.intersect(A,B)

//var lineIntersect = GeometryUtil.lineIntersect({x:106,y:106}, {x:106,y:125}, {x:106,y:125}, {x:0.0, y:125})


console.log(JSON.stringify(intersect))