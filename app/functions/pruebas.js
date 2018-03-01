


function PointOnCampus( Point, Polygon ) {
		x = Point[0]
		y = Point[1]
	    let j = Polygon.length - 1
	    let salida = false
	    for (let i = 0 ; i<= Polygon.length-1 ; i++){
	    	if( (Polygon[i][1] < y && Polygon[j][1] >= y) || (Polygon[j][1] < y && Polygon[i][1] >= y)){
	    		if (Polygon[i][0] + (y - Polygon[i][1]) / (Polygon[j][1] - Polygon[i][1]) * (Polygon[j][0] - Polygon[i][0]) < x) {
	    			salida = !salida
	    		}
	    	}
	    	j=i
	    }
	    return salida
	} 


var location = [18.9684933, -99.2391113]

var poly =  [
	[
	-98.963583,
	18.811692
  ],
	[
	-98.963583,
	18.812464
  ],
	[
	-98.962752,
	18.812464
  ],
	[
	-98.962752,
	18.811692
  ],
	[
	-98.963583,
	18.811692
  ]
  ]

console.log(PointOnCampus(location, poly))

