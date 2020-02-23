const GeometryUtil = require('./geometryutil')
const ClipperLib = require('./clipper.js')

var A = [{"x": -109, "y": 126}, {"x": -109, "y": 119}, {"x": -98, "y": 119}, {"x": -98, "y": 126}]
var B = [{"x": 75, "y": 105}, {"x": 62, "y": 113}, {"x": 53, "y": 107}, {"x": 59, "y": 98}]
// nfp = [[{"x": 75.9045256, "y": 105.2341121}, {"x": 75.9045256, "y": 105.2341114}, {"x": 75.90452690000001, "y": 105.23411060000001}, {"x": 75.904528, "y": 105.23411060000001}, {"x": 75.9045289, "y": 105.2341112}, {"x": 75.9045289, "y": 105.2341119}, {"x": 75.9045283, "y": 105.2341128}, {"x": 75.9045272, "y": 105.2341128}]]

function toClipperCoordinates(polygon){
    var clone = [];
    for(var i=0; i<polygon.length; i++){
        clone.push({
            X: polygon[i].x,
            Y: polygon[i].y
        });
    }

    return clone;
};

function toNestCoordinates(polygon, scale){
    var clone = [];
    for(var i=0; i<polygon.length; i++){
        clone.push({
            x: polygon[i].X/scale,
            y: polygon[i].Y/scale
        });
    }

    return clone;
};

function minkowskiDifference(A, B){
    var Ac = toClipperCoordinates(A);
    ClipperLib.JS.ScaleUpPath(Ac, 10000000);
    var Bc = toClipperCoordinates(B);
    ClipperLib.JS.ScaleUpPath(Bc, 10000000);
    for(var i=0; i<Bc.length; i++){
        Bc[i].X *= -1;
        Bc[i].Y *= -1;
    }
    var solution = ClipperLib.Clipper.MinkowskiSum(Ac, Bc, true);
    var clipperNfp;

    var largestArea = null;
    for(i=0; i<solution.length; i++){
        var n = toNestCoordinates(solution[i], 10000000);
        var sarea = GeometryUtil.polygonArea(n);
        if(largestArea === null || largestArea > sarea){
            clipperNfp = n;
            largestArea = sarea;
        }
    }

    for(var i=0; i<clipperNfp.length; i++){
        clipperNfp[i].x += B[0].x;
        clipperNfp[i].y += B[0].y;
    }

    return [clipperNfp];
}


var nfp = minkowskiDifference(A, B)

console.log(JSON.stringify(nfp))
