lambertianMultiLightShader = function (gl, nLights, nSpotLights) {

	var shaderProgram = gl.createProgram();

	shaderProgram.vertex_shader = "\
precision highp float;                                               \n\
\n\
uniform mat4 uProjectionMatrix;                             \n\
uniform mat4 uModelViewMatrix;                                       \n\
uniform mat3 uViewSpaceNormalMatrix;                                 \n\
\n\
attribute vec3 aPosition;                                            \n\
attribute vec3 aNormal;                                              \n\
attribute vec4 aDiffuse;                                              \n\
attribute vec4 aAmbient;                                              \n\
varying vec3 vpos;                                                   \n\
varying vec3 vnormal;                                                \n\
varying vec4 vdiffuse;                                                \n\
varying vec4 vambient;                                                \n\
void main()                                                          \n\
{                                                                    \n\
  // vertex normal (in view space)                                   \n\
  vnormal = normalize(uViewSpaceNormalMatrix * aNormal);             \n\
                                                                     \n\
  vdiffuse = aDiffuse;             \n\
	vambient = aAmbient;\n\
  \n\
// vertex position (in view space)                                 \n\
vec4 position=vec4(aPosition, 1.0);\n\
  vpos  =vec3(uModelViewMatrix*position);                              \n\
\n\
// output                                                          \n\
  gl_Position = uProjectionMatrix *uModelViewMatrix * position;               \n\
}                                                                    \n\
";

	shaderProgram.fragment_shader = "\
precision highp float;                                               \n\
                                                                     \n\
const int uNLights 		=" + nLights + "; \n\
const int uNSpotLights 	=" + nSpotLights + "; \n\
\n\
uniform vec4 uLightsGeometry[uNLights]; \n\
uniform vec4 uLightsColor[uNLights]; \n\
\n\
uniform vec3 uSpotLightsPos[uNSpotLights]; \n\
uniform vec3 uSpotLightsDir[uNSpotLights]; \n\
uniform vec4 uSpotLightsColor[uNSpotLights]; \n\
uniform float uSpotLightsCutOff[uNSpotLights];\n\
uniform float uSpotLightsFallOff[uNSpotLights];\n\
\n\
uniform vec2 uAreaLightsSize[uNAreaLights]; \n\
uniform vec3 uAreaLightsColor[uNAreaLights]; \n\
uniform mat4 uAreaLightsFrame[uNAreaLights]; \n\
\n\
varying vec3 vnormal;                                                \n\
varying vec3 vpos;                                                   \n\
varying vec4 vdiffuse;                                                \n\
varying vec4 vambient;                                                \n\
                                                             \n\
\n\
\n\
void main()                                                          \n\
{                                                                    \n\
  // normalize interpolated normal                                   \n\
  vec3 N = normalize(vnormal);	                                     \n\
  vec3 lambert= vec3(0,0,0); \n\
\n\
float NdotL; \n\
vec3 L; \n\
float r; \n\
 \n\
  for(int i = 0; i < uNLights; ++i){ \n\
 	if( abs(uLightsGeometry[i].w -1.0)< 0.01 ){ \n\
 		// light vector (positional light)                                 \n\
 		r =  length(uLightsGeometry[i].xyz-vpos); \n\
 		L = normalize(uLightsGeometry[i].xyz-vpos);                         \n\
		NdotL = max(0.0, dot(N, L))/(0.03*3.14 * 3.14*r*r);                                 \n\
 	}\n\
 	else \n\
 	{\n\
		L = -uLightsGeometry[i].xyz; \n\
		r = 1.0; \n\
		NdotL = max(0.0, dot(N, L));                                 \n\
 	}\n\
                                                                     \n\
	// diffuse component                                               \n\
	lambert +=   (vdiffuse.xyz * uLightsColor[i].xyz) * NdotL+uLightsColor[i].xyz*vambient.xyz;                \n\
  } \n\
     \n\
   for(int i = 0; i < uNSpotLights; ++i){ \n\
	// light vector (positional light)                                 \n\
	r = length(uSpotLightsPos[i]-vpos); \n\
	L = normalize(uSpotLightsPos[i]-vpos);                         \n\
	float LdotD = dot( uSpotLightsDir[i], -L);\n\
 	if(LdotD >  uSpotLightsCutOff[i]) \n\
 			LdotD = pow(LdotD,uSpotLightsFallOff[i]);                               \n\
 		else \n\
 			LdotD = 0.0;                               \n\
	// diffuse component                                               \n\
	NdotL = max(0.0, dot(N, L))/( 0.009*3.14 * 3.14 *r*r);                                 \n\
 	lambert +=   (vdiffuse.xyz * uSpotLightsColor[i].xyz)  *LdotD* NdotL;                \n\
  } \n\
   \n\
 \n\
   gl_FragColor  = vec4(lambert, 1.0);                             \n\
  }                                                                    \n\
";

	// create the vertex shader
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, shaderProgram.vertex_shader);
	gl.compileShader(vertexShader);

	// create the fragment shader
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, shaderProgram.fragment_shader);
	gl.compileShader(fragmentShader);

	// Create the shader program
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	shaderProgram.aPositionIndex = 0;
	shaderProgram.aColorIndex = 1;
	shaderProgram.aNormalIndex = 2;
	gl.bindAttribLocation(shaderProgram, shaderProgram.aPositionIndex, "aPosition");
	gl.bindAttribLocation(shaderProgram, shaderProgram.aColorIndex, "aColor");
	gl.bindAttribLocation(shaderProgram, shaderProgram.aNormalIndex, "aNormal");
	gl.linkProgram(shaderProgram);

	shaderProgram.vertexShader = vertexShader;
	shaderProgram.fragmentShader = fragmentShader;

	// If creating the shader program failed, alert
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Unable to initialize the shader program.");
		var str = "";
		str += "VS:\n" + gl.getShaderInfoLog(vertexShader) + "\n\n";
		str += "FS:\n" + gl.getShaderInfoLog(fragmentShader) + "\n\n";
		str += "PROG:\n" + gl.getProgramInfoLog(shaderProgram);
		alert(str);
	}

	shaderProgram.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
	shaderProgram.uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
	shaderProgram.uViewSpaceNormalMatrixLocation = gl.getUniformLocation(shaderProgram, "uViewSpaceNormalMatrix");

	shaderProgram.uLightsGeometryLocation = new Array();
	shaderProgram.uLightsColorLocation = new Array();

	for (var i = 0; i < nLights; ++i) {
		shaderProgram.uLightsGeometryLocation[i] = gl.getUniformLocation(shaderProgram, "uLightsGeometry[" + i + "]");
		shaderProgram.uLightsColorLocation[i] = gl.getUniformLocation(shaderProgram, "uLightsColor[" + i + "]");
	}

	shaderProgram.uSpotLightsPosLocation = new Array();
	shaderProgram.uSpotLightsDirLocation = new Array();
	shaderProgram.uSpotLightsCutOffLocation = new Array();
	shaderProgram.uSpotLightsFallOffLocation = new Array();
	shaderProgram.uSpotLightsColorLocation = new Array();

	shaderProgram.uNSpotLightsLocation = gl.getUniformLocation(shaderProgram, "uNSpotLights");
	for (var i = 0; i < nSpotLights; ++i) {
		shaderProgram.uSpotLightsPosLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsPos[" + i + "]");
		shaderProgram.uSpotLightsDirLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsDir[" + i + "]");
		shaderProgram.uSpotLightsCutOffLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsCutOff[" + i + "]");
		shaderProgram.uSpotLightsFallOffLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsFallOff[" + i + "]");
		shaderProgram.uSpotLightsColorLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsColor[" + i + "]");

	}

	return shaderProgram;
};

lambertianSingleColorMultiLightShader = function (gl, nLights, nSpotLights) {

	var shaderProgram = gl.createProgram();

	shaderProgram.vertex_shader = "\
precision highp float;                                               \n\
const int uNLights 		=" + nLights + "; \n\
const int uNSpotLights 	=" + nSpotLights + "; \n\
\n\
uniform mat4 uProjectionMatrix;                             \n\
uniform mat4 uModelViewMatrix;                                       \n\
uniform mat3 uViewSpaceNormalMatrix;                                 \n\
\n\
attribute vec3 aPosition;                                            \n\
attribute vec3 aNormal;                                              \n\
varying vec3 vpos;                                                   \n\
varying vec3 vnormal;                                                \n\
void main()                                                          \n\
{                                                                    \n\
  // vertex normal (in view space)                                   \n\
  vnormal = normalize(uViewSpaceNormalMatrix * aNormal);             \n\
                                                                     \n\
  \n\
// vertex position (in view space)                                 \n\
	vec4 position = vec4(aPosition, 1.0);                              \n\
	vpos = vec3(uModelViewMatrix * position);                          \n\
// output                                                          \n\
  gl_Position = uProjectionMatrix *uModelViewMatrix * position;               \n\
}                                                                    \n\
";
shaderProgram.fragment_shader = "\
precision highp float;                                               \n\
                                                                     \n\
const int uNLights 		=" + nLights + "; \n\
const int uNSpotLights 	=" + nSpotLights + "; \n\
uniform vec4 uColor; \n\
uniform vec4 uLightsGeometry[uNLights]; \n\
uniform vec4 uLightsColor[uNLights]; \n\
\n\
uniform vec4 uSpotLightsColor[uNSpotLights]; \n\
uniform float uSpotLightsCutOff[uNSpotLights];\n\
uniform float uSpotLightsFallOff[uNSpotLights];\n\
\n\
varying vec3 vnormal;                                                \n\
varying vec3 vpos;                                                   \n\
                                                                     \n\
// positional light: position and color                              \n\
uniform vec3 uSpotLightsPos[uNSpotLights]; \n\
uniform vec3 uSpotLightsDir[uNSpotLights]; \n\
\n\
\n\
void main()                                                          \n\
{                                                                    \n\
  // normalize interpolated normal                                   \n\
  vec3 N = normalize(vnormal);	                                     \n\
  vec3 lambert= vec3(0,0,0); \n\
\n\
float r, NdotL; \n\
vec3 L; \n\
  for(int i = 0; i < uNLights; ++i){ \n\
 	if( abs(uLightsGeometry[i].w -1.0)< 0.01 ){ \n\
 		// light vector (positional light)                                 \n\
 		r =  length(uLightsGeometry[i].xyz-vpos); \n\
 		L = normalize(uLightsGeometry[i].xyz-vpos);                         \n\
		NdotL = max(0.0, dot(N, L))/(0.01*3.14 * 3.14 *r*r);                                 \n\
 	}\n\
 	else \n\
 	{\n\
		L = -uLightsGeometry[i].xyz; \n\
	NdotL = max(0.0, dot(N, L));                                 \n\
	}\n\
                                                                     \n\
	// diffuse component                                               \n\
\n\
	lambert +=   (uColor.xyz * uLightsColor[i].xyz) * NdotL;                \n\
  } \n\
     \n\
   for(int i = 0; i < uNSpotLights; ++i){ \n\
	// light vector (positional light)                                 \n\
	r =  length(uSpotLightsPos[i]-vpos); \n\
	L = normalize(uSpotLightsPos[i]-vpos);                         \n\
	float LdotD = dot(uSpotLightsDir[i], -L);\n\
	if(LdotD >  uSpotLightsCutOff[i]) \n\
			LdotD = pow(LdotD,uSpotLightsFallOff[i]);                               \n\
		else \n\
			LdotD = 0.0;                               \n\
	// diffuse component                                               \n\
	NdotL = max(0.0, dot(N, L))/(0.0009*3.14 * 3.14 *r*r);                                 \n\
	lambert +=   (uColor.xyz * uSpotLightsColor[i].xyz) * LdotD*NdotL;                \n\
  } \n\
 \n\
   gl_FragColor  = vec4(lambert, 1.0);                             \n\
  }                                                                    \n\
";

	// create the vertex shader
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertexShader, shaderProgram.vertex_shader);
	gl.compileShader(vertexShader);

	// create the fragment shader
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, shaderProgram.fragment_shader);
	gl.compileShader(fragmentShader);

	// Create the shader program
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	shaderProgram.aPositionIndex = 0;
	shaderProgram.aNormalIndex = 2;
	gl.bindAttribLocation(shaderProgram, shaderProgram.aPositionIndex, "aPosition");
	gl.bindAttribLocation(shaderProgram, shaderProgram.aNormalIndex, "aNormal");
	gl.linkProgram(shaderProgram);

	shaderProgram.vertexShader = vertexShader;
	shaderProgram.fragmentShader = fragmentShader;

	// If creating the shader program failed, alert
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Unable to initialize the shader program.");
		var str = "";
		str += "VS:\n" + gl.getShaderInfoLog(vertexShader) + "\n\n";
		str += "FS:\n" + gl.getShaderInfoLog(fragmentShader) + "\n\n";
		str += "PROG:\n" + gl.getProgramInfoLog(shaderProgram);
		alert(str);
	}

	shaderProgram.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
	shaderProgram.uModelViewMatrixLocation = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
	shaderProgram.uViewSpaceNormalMatrixLocation = gl.getUniformLocation(shaderProgram, "uViewSpaceNormalMatrix");

	shaderProgram.uLightsGeometryLocation = new Array();
	shaderProgram.uLightsColorLocation = new Array();

	for (var i = 0; i < nLights; ++i) {
		shaderProgram.uLightsGeometryLocation[i] = gl.getUniformLocation(shaderProgram, "uLightsGeometry[" + i + "]");
		shaderProgram.uLightsColorLocation[i] = gl.getUniformLocation(shaderProgram, "uLightsColor[" + i + "]");
	}

	shaderProgram.uSpotLightsPosLocation = new Array();
	shaderProgram.uSpotLightsDirLocation = new Array();
	shaderProgram.uSpotLightsCutOffLocation = new Array();
	shaderProgram.uSpotLightsFallOffLocation = new Array();
	shaderProgram.uSpotLightsColorLocation = new Array();

	shaderProgram.uNSpotLightsLocation = gl.getUniformLocation(shaderProgram, "uNSpotLights");
	for (var i = 0; i < nSpotLights; ++i) {
		shaderProgram.uSpotLightsPosLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsPos[" + i + "]");
		shaderProgram.uSpotLightsDirLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsDir[" + i + "]");
		shaderProgram.uSpotLightsCutOffLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsCutOff[" + i + "]");
		shaderProgram.uSpotLightsFallOffLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsFallOff[" + i + "]");
		shaderProgram.uSpotLightsColorLocation[i] = gl.getUniformLocation(shaderProgram, "uSpotLightsColor[" + i + "]");

	}

	shaderProgram.uColorLocation = gl.getUniformLocation(shaderProgram, "uColor");

	return shaderProgram;
};
