function Tunnel( t ) {
	this.name = "Tunnel";

	var nv = t.pointsCount;

	this.vertices = new Float32Array(nv*2*3);

	var vertexOffset = 0;


	for (var i=0; i<3; i++) {
		var v = t.positionAt(i);
		this.vertices[vertexOffset + 0] = v[0];
		this.vertices[vertexOffset + 1] = v[1];
		this.vertices[vertexOffset + 2] = v[2];
		vertexOffset += 3;
	}

	for(var i =0; i<3; i++)
	{
		var v = t.positionAt(i);
		this.vertices[vertexOffset + 0] = v[0];
		this.vertices[vertexOffset + 1] = t.height;
		this.vertices[vertexOffset + 2] = v[2];
		vertexOffset += 3;
	}

	this.triangleIndices = new Uint16Array(7*3);

	var triangleoffset = 0;

	for (var i=0; i< 3; i++) {
		this.triangleIndices[triangleoffset + 0] = i;
		this.triangleIndices[triangleoffset + 1] = (i+1)%3;
		this.triangleIndices[triangleoffset + 2] = i+3;
		triangleoffset += 3;

		this.triangleIndices[triangleoffset + 0] = i+3;
		this.triangleIndices[triangleoffset + 1] = (i+1)%3 + 3;
		this.triangleIndices[triangleoffset + 2] = (i+1)%3;
		triangleoffset += 3;
	}

	//top of cake
	this.triangleIndices[triangleoffset + 0] = 3;
	this.triangleIndices[triangleoffset + 1] = 4;
	this.triangleIndices[triangleoffset + 2] = 5;
	//
	this.numVertices  = this.vertices.length/3;
	this.numTriangles = this.triangleIndices.length / 3;
};
