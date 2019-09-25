///// CYLINDER DEFINITION
/////
///// Resolution is the number of faces used to tesselate the cylinder.
///// Cylinder is defined to be centered at the origin of the coordinate axis, and lying on the XZ plane.
///// Cylinder height is assumed to be 2.0. Cylinder radius is assumed to be 1.0 .
function Sphere1 (long, lat) {

	this.name = "sphere1";

	// vertices definition
	////////////////////////////////////////////////////////////

	this.vertices = new Float32Array(3*((long-1)*(lat)+2));

	var radius = 1.0;
	var p;
  var t;
  var p_step = Math.PI / long;
	var t_step = 6.283185307179586476925286766559 / lat;

	var vertexoffset = 0;
  // bottom vertex
  this.vertices[vertexoffset] = 0.0;
  this.vertices[vertexoffset+1] = -1.0;
  this.vertices[vertexoffset+2] = 0.0;
  vertexoffset += 3;

  // middle sphere
	for (var i = 1; i < long; i++) {
    p = p_step*i - Math.PI/2; //start from -pi/2 and go to pi/2 for longitude
    //console.log(p);
    for(var j = 0; j < lat; j++){
      t = t_step*j;
      //console.log(t);
      this.vertices[vertexoffset] = Math.cos(p) * Math.sin(t);
      //console.log(this.vertices[vertexoffset]);
  		this.vertices[vertexoffset+1] = Math.sin(p);
      //console.log(this.vertices[vertexoffset+1]);
  		this.vertices[vertexoffset+2] = Math.cos(p) * Math.cos(t);
      //console.log(this.vertices[vertexoffset+2]);
  		vertexoffset += 3;
    }
	}

  // top vertex
  this.vertices[vertexoffset] = 0.0;
  this.vertices[vertexoffset+1] = 1.0;
  this.vertices[vertexoffset+2] = 0.0;
  vertexoffset += 3;

  var totalvertices = vertexoffset/3;

	// triangles definition
	////////////////////////////////////////////////////////////

	this.triangleIndices = new Uint16Array(6*long*lat);

	var triangleoffset = 0;
  // bottom of sphere
	for (var i = 0; i < lat; i++)
	{
		this.triangleIndices[triangleoffset] = 0; //bottom vertex
		this.triangleIndices[triangleoffset+1] = i+1;//%totalvertices;
		this.triangleIndices[triangleoffset+2] = (i+1)%lat + 1;//%totalvertices;
		triangleoffset += 3;
	}

  //middle of sphere
	for (var i = 0; i <= lat*(long-1); i++)
	{
    if(i <= (lat)*(long-2)){
		    this.triangleIndices[triangleoffset] = i;
		    this.triangleIndices[triangleoffset+1] = i+1;
		    this.triangleIndices[triangleoffset+2] = i+lat;
		    triangleoffset += 3;
      }

    if(i >= lat){
		    this.triangleIndices[triangleoffset] = i;
		    this.triangleIndices[triangleoffset+1] = i+1;
		    this.triangleIndices[triangleoffset+2] = i+1-lat;
		    triangleoffset += 3;
      }
	}

  for (var i = 0; i < lat; i++)
	{
		this.triangleIndices[triangleoffset] = totalvertices-1; //bottom vertex
		this.triangleIndices[triangleoffset+1] = i+(lat)*(long-2);//%totalvertices;
		this.triangleIndices[triangleoffset+2] = i+1+(lat)*(long-2);//%totalvertices;
		triangleoffset += 3;
	}

	this.numVertices = this.vertices.length/3;
	this.numTriangles = this.triangleIndices.length/3;
}
