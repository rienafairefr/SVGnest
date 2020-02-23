function getRndInteger(min, max) {
return Math.floor(Math.random() * (max - min) ) + min;
}

function polygonArea(polygon) {
    var area = 0;
    var i, j;
    for (i=0, j=polygon.length-1; i<polygon.length; j=i++){
        area += (polygon[j].x+polygon[i].x) * (polygon[j].y-polygon[i].y); 
    }
    return 0.5*area;
}

var values = []
for (var i=0; i<20; i++) {
    polygon = []
    for (var j=0; j<getRndInteger(3, 25); j++) {
        polygon.push({x: getRndInteger(0, 100), y: getRndInteger(0, 100)})
    }
    values.push([polygon, polygonArea(polygon)])
}
for (var i=0; i<20; i++) {
    polygon = []
    for (var j=0; j<4; j++) {
        polygon.push({x: getRndInteger(0, 100), y: getRndInteger(0, 100)})
    }
    values.push([polygon, polygonArea(polygon)])
}
console.log(JSON.stringify(values))