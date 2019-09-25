function Cabin() {
	this.name = "Cabin";

	this.vertices = new Float32Array(
	[-1,-1,0,      1,-1,0,      1,-0.5,0,     0.3,-0.4,0,    0.26,-0.44,0,   -0.31,-0.44,0,   -0.36,-0.40,0.0,      -1,-0.44,0.0, // base 8
	-1,0.6,0,		-0.4,0.83,0.0,		0.36,0.83,0.0, 	1,0.6,0.0,  1,1,0,	 -1,1,0, // upper 14
	-0.97,-0.8,-0.1,	-0.35,-0.8,-0.1, 	-0.4,-0.5,-0.1, -0.95,-0.52,-0.1, // 18
	-0.3,-1,-0.2,		 	0.3, -1,-0.2, 	 0.2,-0.7,-0.2,		-0.2,-0.7,-0.2,//22
	-1,-0.96,-0.3,		-0.9,-0.7,-0.3,		-0.69,-0.54,-0.3,		-0.5,-0.5,-0.3,	-0.29,-0.55,-0.3,		-0.14,-0.66,-0.3,			-0.043,-0.8,-0.3,	-0.006,-1,-0.3,
	-1,-0.67,-0.3,		-0.91,-0.58,-0.3,	-0.72,-0.45,-0.3,		-0.5,-0.4,-0.3,	-0.25,-0.46,-0.3,		-0.075,-0.59,-0.3,		 0.050,-0.78,-0.3,	0.1,-1.0,-0.3	
	]  );
	var nv = this.vertices.length/3
	
	this.triangleIndices = new Uint16Array(
	[0,6,7,	0,5,6,	0,4,5,	0,1,4,	1,2,4,	2,3,4,
	8,9,13,	9,12,13,	9,10,12,	10,11,12,
	14,15,17,	15,16,17,
	18,19,21,		19,20,21,
	22,23,30,		23,24,31, 	24,25,32,	25,26,33,		26,27,34,	27,28,35, 28,29,36,
	23,31,30,		24,32,31,		25,33,32,	26,34,33,		27,35,34,	28,36,35,	29,37,36	
	]
	);
	
	this.vertex_color = new Float32Array([
	0.4,0.2,0.2,1,    0.4,0.2,0.2,1,    0.4,0.3,0.3,1,    0.4,0.3,0.3,1,    0.4,0.3,0.3,1,    0.4,0.3,0.3,1,    0.4,0.3,0.3,1,    0.4,0.3,0.3,1,    
	0.4,0.4,0.4,1,	0.4,0.4,0.4,1,	0.4,0.4,0.4,1,	0.4,0.4,0.4,1,	0.5,0.4,0.4,1,	0.5,0.4,0.4,1,
	0.3,0.1,0.0,1,	0.3,0.1,0.0,1,	0.3,0.1,0.0,1,	0.3,0.1,0.0,1,
	0.3,0.1,0.1,1,	0.3,0.1,0.1,1,	0.3,0.1,0.1,1,	0.3,0.1,0.1,1,
	0.5,0.1,0.1,1,		0.5,0.1,0.1,1,	0.5,0.1,0.1,1,	0.5,0.1,0.1,1,	0.5,0.1,0.1,1,	0.5,0.1,0.1,1,	0.5,0.1,0.1,1, 0.5,0.1,0.1,1,	
	0.4,0.0,0.0,1,		0.4,0.0,0.0,1,		0.4,0.0,0.0,1,		0.4,0.0,0.0,1,		0.4,0.0,0.0,1,		0.4,0.0,0.0,1,		0.4,0.0,0.0,1,		0.4,0.0,0.0,1,	 
	]
	);
	
	this.numVertices  = nv;
	this.numTriangles =nv-2;
};

function RearMirror(){
	this.name = "RearMirror";
	this.vertices = new Float32Array(
	[
	-0.45,0.38,0,  0.453,0.388,0,   0.369,0.722,0,  -0.356,0.722,0, //mirror 8
	-0.044,0.725,0.0, 	0.05,0.725,0, 	0.09,0.83,0,  -0.09,0.83,0.0, //hang 12
	]  );
	var nv = this.vertices.length/3
	
	this.triangleIndices = new Uint16Array(
	[
	0,1,2,	0,2,3,
	4,5,6,	4,6,7,
	]
	);
	
	this.vertex_color = new Float32Array([
	1,0,0,1,	1,0,0,1,	1,0,0,1,	1,0,0,1,
	1,0,0,1,	1,0,0,1,	1,0,0,1,	1,0,0,1,
	]
	);
	
	this.numVertices  = nv;
	this.numTriangles =nv-2;
}

function Windshield() {
	this.name = "Windshield";

	this.vertices = new Float32Array(
	[
	-1,0.4,0,		-0.4,0.63,0.0,		0.36,0.63,0.0, 	1,0.4,0.0, 	1,0.6,0.0, 	0.36,0.83,0.0,  -0.4,0.83,0.0,	-1,0.6,0,
	 1,-0.5,0,     0.3,-0.4,0,    0.26,-0.44,0,   -0.31,-0.44,0,   -0.36,-0.40,0.0,      -1,-0.44,0.0,-1,0.6,0,		-0.4,0.83,0.0,		0.36,0.83,0.0, 	1,0.6,0.0,
	]  );
	var nv = this.vertices.length/3
	
	this.triangleIndices = new Uint16Array(
	[
	0,1,7,	1,6,7,	1,2,5,	1,5,6,	2,3,4,	2,4,5,
	8,9,17,	9,16,17,	9,10,16,	10,11,16,	11,12,16,	12,15,16,	12,13,14,	12,14,15
	]
	);
	
	this.vertex_color = new Float32Array([
	0,0,0,0.5,	0,0,0,0.5,	0,0,0,0.5,	0,0,0,0.5,	0,0,0,1,	0,0,0,1,	0,0,0,1,	0,0,0,1,
	0.5,0.5,0.5,0.1,	0.5,0.5,0.5,0.1,	0.5,0.5,0.5,0.1,	0.5,0.5,0.5,0.1,	0.5,0.5,0.5,0.1,	0.5,0.5,0.5,0.1,	0,0,0,0.1,	0,0,0,0.1,	0,0,0,0.1,	0,0,0,0.1
	]
	);
	
	this.numVertices  = nv;
	this.numTriangles =nv-2;
};
