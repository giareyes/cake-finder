// Global NVMC Client
// ID 4.0
/***********************************************************************/
var NVMCClient = NVMCClient || {};
var num = 0;
var old_pos = [ 3.71,0,61.19 ];
var e_pos = [150 ,0, 150];
var e_motion = [0, 0, 0];
/***********************************************************************/
reset_enemy = function() {
	e_pos = [150 ,0, 150];
}
NVMCClient.myPos = function () {
	return this.game.state.players.me.dynamicState.position;
}
NVMCClient.myOri = function () {
	return this.game.state.players.me.dynamicState.orientation;
}

NVMCClient.myFrame = function () {
	return this.game.state.players.me.dynamicState.frame;
}

// NVMC Client Internals
/***********************************************************************/
NVMCClient.createObjectBuffers = function (gl, obj) {
	obj.vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, obj.vertices, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	obj.indexBufferTriangles = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, obj.triangleIndices, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	// create edges
	var edges = new Uint16Array(obj.numTriangles * 3 * 2);
	for (var i = 0; i < obj.numTriangles; ++i) {
		edges[i * 6 + 0] = obj.triangleIndices[i * 3 + 0];
		edges[i * 6 + 1] = obj.triangleIndices[i * 3 + 1];
		edges[i * 6 + 2] = obj.triangleIndices[i * 3 + 0];
		edges[i * 6 + 3] = obj.triangleIndices[i * 3 + 2];
		edges[i * 6 + 4] = obj.triangleIndices[i * 3 + 1];
		edges[i * 6 + 5] = obj.triangleIndices[i * 3 + 2];
	}

	obj.indexBufferEdges = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

NVMCClient.drawObject = function (gl, obj, fillColor, lineColor) {
	gl.bindBuffer(gl.ARRAY_BUFFER, obj.vertexBuffer);
	gl.enableVertexAttribArray(this.uniformShader.aPositionIndex);
	gl.vertexAttribPointer(this.uniformShader.aPositionIndex, 3, gl.FLOAT, false, 0, 0);

	gl.enable(gl.POLYGON_OFFSET_FILL);
	gl.polygonOffset(1.0, 1.0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferTriangles);
	gl.uniform4fv(this.uniformShader.uColorLocation, fillColor);
	gl.drawElements(gl.TRIANGLES, obj.triangleIndices.length, gl.UNSIGNED_SHORT, 0);

	gl.disable(gl.POLYGON_OFFSET_FILL);

	gl.uniform4fv(this.uniformShader.uColorLocation, lineColor);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indexBufferEdges);
	gl.drawElements(gl.LINES, obj.numTriangles * 3 * 2, gl.UNSIGNED_SHORT, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	gl.disableVertexAttribArray(this.uniformShader.aPositionIndex);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
};

NVMCClient.createObjects = function () {
	this.cube = new Cube(10);
	this.sphere = new Sphere1(20,20);
	this.cylinder = new Cylinder(10);
	this.cone = new Cone(10);

	this.track = new Track(this.game.race.track);
	var bbox = this.game.race.bbox;
	var quad = [bbox[0], bbox[1] - 0.01, bbox[2],
		bbox[3], bbox[1] - 0.01, bbox[2],
		bbox[3], bbox[1] - 0.01, bbox[5],
		bbox[0], bbox[1] - 0.01, bbox[5]
	];

	this.ground = new Quadrilateral(quad);

	var gameBuildings = this.game.race.buildings;
	this.buildings = new Array(gameBuildings.length);
	for (var i = 0; i < gameBuildings.length; ++i) {
		this.buildings[i] = new Building(gameBuildings[i]);
	}
};

NVMCClient.createBuffers = function (gl) {
	this.createObjectBuffers(gl, this.cube);
	this.createObjectBuffers(gl, this.sphere);
	this.createObjectBuffers(gl, this.cylinder);
	this.createObjectBuffers(gl, this.cone);
	this.createObjectBuffers(gl, this.track);
	this.createObjectBuffers(gl, this.ground);

	for (var i = 0; i < this.buildings.length; ++i) {
		this.createObjectBuffers(gl, this.buildings[i]);
	}
};

NVMCClient.initializeObjects = function (gl) {
	this.createObjects();
	this.createBuffers(gl);
};

NVMCClient.drawHair = function (gl) {
	var stack = this.stack;

	//right pigtail
	stack.push();
	var M_6 = SglMat4.translation([0.5, -0.6, 1]);
	stack.multiply(M_6);

	var M_3_sca = SglMat4.scaling([0.3, 0.05, 0.3]);
	stack.multiply(M_3_sca);

	var rotate = SglMat4.rotationAngleAxis(sglDegToRad(45), [-1, 0, 0]);
	stack.multiply(rotate);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cylinder, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	stack.push();
	var M_6 = SglMat4.translation([0.5, -1, 1]);
	stack.multiply(M_6);

	var M_3_sca = SglMat4.scaling([0.3, 0.5, 0.4]);
	stack.multiply(M_3_sca);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [0.55, 0.35, 0.11, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	//left pigtail
	stack.push();
	var M_6 = SglMat4.translation([-0.5, -0.6, 1]);
	stack.multiply(M_6);

	var M_3_sca = SglMat4.scaling([0.3, 0.05, 0.3]);
	stack.multiply(M_3_sca);

	var rotate = SglMat4.rotationAngleAxis(sglDegToRad(45), [-1, 0, 0]);
	stack.multiply(rotate);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cylinder, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	stack.push();
	var M_6 = SglMat4.translation([-0.5, -1, 1]);
	stack.multiply(M_6);

	var M_3_sca = SglMat4.scaling([0.3, 0.5, 0.4]);
	stack.multiply(M_3_sca);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [0.55, 0.35, 0.11, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

};

NVMCClient.drawHead = function (gl) {
	var stack = this.stack;

	stack.push();
	var M_6 = SglMat4.translation([0, 1.8, 0]);
	stack.multiply(M_6);

	var M_3_sca = SglMat4.scaling([0.4, 0.4, 0.4]);
	stack.multiply(M_3_sca);

	this.drawHair(gl);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [0.55, 0.35, 0.11, 1.0], [0, 0, 0, 1.0]);
	stack.pop();
};

NVMCClient.drawLeg = function (gl, side, num) {
	var stack = this.stack;

	stack.push();
	if(side == "right")
	{
		var M_2_tra_1 = SglMat4.translation([0.5, -3, 0]);
		stack.multiply(M_2_tra_1);

		var M_2_sca = SglMat4.scaling([0.4, 1, 0.4]);
		stack.multiply(M_2_sca);
		if(num > 0 && num <=5)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad(num*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 5 && num <=10)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad(20 - ((num-5)*4)), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 10 && num <=15)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad((10-num)*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 15)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad((num-20)*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}
	}
	else {
		var M_2_tra_1 = SglMat4.translation([-0.5, -3, 0]);
		stack.multiply(M_2_tra_1);

		var M_2_sca = SglMat4.scaling([0.4, 1, 0.4]);
		stack.multiply(M_2_sca);

		if(num > 0 && num <=5)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad(num*-4), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 5 && num <=10)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad(-20 + ((num-5)*4)), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 10 && num <=15)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad((num-10)*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 15)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad((20-num)*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}
	}

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cylinder, [0.24, 0.40, 0.63, 1.0], [0, 0, 0, 1.0]);
	stack.pop();
};

NVMCClient.drawJoint = function (gl) {
	var stack = this.stack;

	stack.push();
	var M_2_tra_1 = SglMat4.translation([0, -0.5, 0]);
	stack.multiply(M_2_tra_1);
	var M_2_sca = SglMat4.scaling([1, 0.7, 1]);
	stack.multiply(M_2_sca);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.sphere, [0.95, 0.79, 0.61, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	stack.push();
	var arm_rotate = SglMat4.rotationAngleAxis(sglDegToRad(90), [0, 0, 1]);
	stack.multiply(arm_rotate);
	var arm_move = SglMat4.translation([-0.5, 1, 0]);
	stack.multiply(arm_move);
	var arm_scale = SglMat4.scaling([0.7, 1.5, 1]);
	stack.multiply(arm_scale);
	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cylinder, [0.95, 0.79, 0.61, 1.0], [0, 0, 0, 1.0]);
	stack.pop();
};

NVMCClient.drawArm = function (gl, side, num) {
	var stack = this.stack;

	stack.push();
	if(side == "right")
	{
		var M_2_tra_1 = SglMat4.translation([1.25, -0.95, 0]);
		stack.multiply(M_2_tra_1);

		var M_2_sca = SglMat4.scaling([0.3, 1, 0.3]);
		stack.multiply(M_2_sca);

		if(num > 0 && num <=5)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad(num*-4), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 5 && num <=10)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad(-20 + ((num-5)*4)), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 10 && num <=15)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad((num-10)*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 15)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad((20-num)*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}
	}
	else {
		var arm_rotate = SglMat4.rotationAngleAxis(sglDegToRad(-45), [0, 0, 1]);
		stack.multiply(arm_rotate);
		var M_2_tra_1 = SglMat4.translation([-1.25, -1.25, 0]);
		stack.multiply(M_2_tra_1);
		var M_2_sca = SglMat4.scaling([0.3, 0.5, 0.3]);
		stack.multiply(M_2_sca);
		if(num > 0 && num <=5)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad(num*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 5 && num <=10)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad(20 - ((num-5)*4)), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 10 && num <=15)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad((10-num)*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}

		if(num > 15)
		{
			var rotate = SglMat4.rotationAngleAxis(sglDegToRad((num-20)*4), [-1, 0, 0]);
			stack.multiply(rotate);
		}
		this.drawJoint(gl);
	}

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cylinder, [0.95, 0.79, 0.61, 1.0], [0, 0, 0, 1.0]);
	stack.pop();
};

NVMCClient.drawBody = function (gl, num) {
	// console.log(num);
	var stack = this.stack;

	stack.push();
	var M_2_tra_1 = SglMat4.translation([0, 1, 0]);
	stack.multiply(M_2_tra_1);

	var M_2_sca = SglMat4.scaling([0.3, 0.4, 0.3]);
	stack.multiply(M_2_sca);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cube, [0.8, 0.2, 0.2, 1.0], [0, 0, 0, 1.0]);

	this.drawArm(gl, "right", num);
	this.drawArm(gl, "left", num);
	this.drawLeg(gl, "right", num);
	this.drawLeg(gl, "left", num);
	stack.pop();
};

NVMCClient.drawCar = function (gl, num) {
	var stack = this.stack;

	stack.push();
	var M_2_tra_0 = SglMat4.translation([0, 0.3, 1]);
	stack.multiply(M_2_tra_0);

	this.drawHead(gl);
	this.drawBody(gl, num);
	stack.pop();
};

NVMCClient.drawTree = function (gl) {
	var stack = this.stack;

	stack.push();
	var M_0_tra1 = SglMat4.translation([0, 0.8, 0]);
	stack.multiply(M_0_tra1);

	var M_0_sca = SglMat4.scaling([2, 3, 2]);
	stack.multiply(M_0_sca);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cone, [1.0, 0.54, 0.12, 1.0], [0, 0, 0, 1.0]);
	stack.pop();

	stack.push();
	var M_1_sca = SglMat4.scaling([0.75, 0.75, 0.75]);
	stack.multiply(M_1_sca);

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.cylinder, [0.70, 0.56, 0.35, 1.0], [0, 0, 0, 1.0]);
	stack.pop();
};

NVMCClient.drawScene = function (gl, num) {
	var pos = this.myPos();

	var width = this.ui.width;
	var height = this.ui.height

	gl.viewport(0, 0, width, height);

	// Clear the framebuffer
	gl.clearColor(0.4, 0.6, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.enable(gl.DEPTH_TEST);
	gl.useProgram(this.uniformShader);


	// Setup projection matrix
	var ratio = width / height; //line 229, Listing 4.1{
	var bbox = this.game.race.bbox;
	var winW = (bbox[3] - bbox[0]);
	var winH = (bbox[5] - bbox[2]);
	winW = winW * ratio * (winH / winW);
	var P = SglMat4.ortho([-winW / 2, -winH / 2, 0.0], [winW / 2, winH / 2, 21.0]);
	gl.uniformMatrix4fv(this.uniformShader.uProjectionMatrixLocation, false, P);

	var stack = this.stack;
	stack.loadIdentity(); //line 238}
	// create the inverse of V //line 239, Listing 4.2{
	var invV = SglMat4.lookAt([0, 20, 0], [0, 0, 0], [1, 0, 0]);
	stack.multiply(invV);
	stack.push();//line 242
	var M_9 = this.myFrame();
	stack.multiply(M_9);
	this.drawCar(gl, num);
	stack.pop();

	var trees = this.game.race.trees;
	for (var t in trees) {
		stack.push();
		var M_8 = SglMat4.translation(trees[t].position);
		stack.multiply(M_8);
		this.drawTree(gl);
		stack.pop();
	}

	gl.uniformMatrix4fv(this.uniformShader.uModelViewMatrixLocation, false, stack.matrix);
	this.drawObject(gl, this.track, [0.9, 0.8, 0.7, 1.0], [0, 0, 0, 1.0]);
	this.drawObject(gl, this.ground, [0.3, 0.7, 0.2, 1.0], [0, 0, 0, 1.0]);

	for (var i in this.buildings) {
		this.drawObject(gl, this.buildings[i], [0.8, 0.8, 0.8, 1.0], [0.2, 0.2, 0.2, 1.0]);
	}
	gl.useProgram(null);
	gl.disable(gl.DEPTH_TEST);
};
/***********************************************************************/

NVMCClient.initMotionKeyHandlers = function () {
	var game = this.game;

	var carMotionKey = {};
	carMotionKey["W"] = function (on) {
		game.playerAccelerate = on;
	};
	carMotionKey["S"] = function (on) {
		game.playerBrake = on;
	};
	carMotionKey["A"] = function (on) {
		game.playerSteerLeft = on;
	};
	carMotionKey["D"] = function (on) {
		game.playerSteerRight = on;
	};
	this.carMotionKey = carMotionKey;
};

// NVMC Client Events
/***********************************************************************/
NVMCClient.onInitialize = function () {// line 290, Listing 4.2{
	var gl = this.ui.gl;
	NVMC.log("SpiderGL Version : " + SGL_VERSION_STRING + "\n");
	this.game.player.color = [1.0, 0.0, 0.0, 1.0];
	//NVMC.GamePlayers.addOpponent();
	this.initMotionKeyHandlers();
	this.stack = new SglMatrixStack();
	this.initializeObjects(gl); //LINE 297}
	this.uniformShader = new uniformShader(gl);
};

NVMCClient.onTerminate = function () {};

NVMCClient.onConnectionOpen = function () {
	NVMC.log("[Connection Open]");
};

NVMCClient.onConnectionClosed = function () {
	NVMC.log("[Connection Closed]");
};

NVMCClient.onConnectionError = function (errData) {
	NVMC.log("[Connection Error] : " + errData);
};

NVMCClient.onLogIn = function () {
	NVMC.log("[Logged In]");
};

NVMCClient.onLogOut = function () {
	NVMC.log("[Logged Out]");
};

NVMCClient.onNewRace = function (race) {
	NVMC.log("[New Race]");
};

NVMCClient.onPlayerJoin = function (playerID) {
	NVMC.log("[Player Join] : " + playerID);
	this.game.opponents[playerID].color = [0.0, 1.0, 0.0, 1.0];
};

NVMCClient.onPlayerLeave = function (playerID) {
	NVMC.log("[Player Leave] : " + playerID);
};

NVMCClient.onKeyDown = function (keyCode, event) {
	this.carMotionKey[keyCode] && this.carMotionKey[keyCode](true);
};

NVMCClient.onKeyUp = function (keyCode, event) {
	this.carMotionKey[keyCode] && this.carMotionKey[keyCode](false);
};

NVMCClient.onKeyPress = function (keyCode, event) {};

NVMCClient.onMouseButtonDown = function (button, x, y, event) {};

NVMCClient.onMouseButtonUp = function (button, x, y, event) {};

NVMCClient.onMouseMove = function (x, y, event) {};

NVMCClient.onMouseWheel = function (delta, x, y, event) {};

NVMCClient.onClick = function (button, x, y, event) {};

NVMCClient.onDoubleClick = function (button, x, y, event) {};

NVMCClient.onDragStart = function (button, x, y) {};

NVMCClient.onDragEnd = function (button, x, y) {};

NVMCClient.onDrag = function (button, x, y) {};

NVMCClient.onResize = function (width, height, event) {};

NVMCClient.onAnimate = function (dt) {
	this.ui.postDrawEvent();
};

NVMCClient.onDraw = function () {
	// console.log(e_motion);
	var gl = this.ui.gl;
	var new_pos = this.myPos();
	this.drawScene(gl, num, e_pos);
	if((old_pos[0] >= (new_pos[0]+0.35)) ||(old_pos[0] <= (new_pos[0]-0.35))||
	   (old_pos[1] >= (new_pos[1]+0.35)) ||(old_pos[1] <= (new_pos[1]-0.35))||
   	   (old_pos[2] >= (new_pos[2]+0.35)) ||(old_pos[2] <= (new_pos[2]-0.35)))
	{
		num++;
		num = num%20;
		old_pos = new_pos;
	}
	e_motion = SpiderGL.Math.Vec3.sub(old_pos, e_pos);
	e_motion = SpiderGL.Math.Vec3.normalize(e_motion);
	e_motion = SpiderGL.Math.Vec3.divs(e_motion, 20);
	e_pos = SpiderGL.Math.Vec3.add(e_pos, e_motion);
};
/***********************************************************************/
