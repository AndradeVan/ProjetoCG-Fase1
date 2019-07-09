var scene;
var camera1, camera2;
var renderer;

var angle = 0;
var radius = 100;
var flagAprox = 0;
var controls = {};
var player = {height:1.8, speed: 2.5, turnSpeed: Math.PI * 0.02};
var animation;
var clock;
var controls;


var init = function() {

    /*criando cenario */
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x77dd77);
    /*parte do fundo branco*/
    scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );
    clock = new THREE.Clock();

    /*inicializando camera1 e camera2 */
   camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
   camera.position.set(0,350,1300);
	camera.lookAt(scene.position);

   scene.add(camera);


   scene.add( new THREE.AmbientLight( 0x222222 ) );

	var light = new THREE.DirectionalLight( 0xffffff, 2.25 );
	light.position.set( 200, 450, 500 );
	light.castShadow = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 512;
	light.shadow.camera.near = 100;
	light.shadow.camera.far = 1200;
	light.shadow.camera.left = - 1000;
	light.shadow.camera.right = 1000;
	light.shadow.camera.top = 350;
	light.shadow.camera.bottom = - 350;
	scene.add( light );


   var gt = new THREE.TextureLoader().load("textures/terrain/grasslight-big.jpg");
	var gg = new THREE.PlaneBufferGeometry( 16000, 16000 );
	var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );
	var ground = new THREE.Mesh(gg, gm) ;
	ground.rotation.x = - Math.PI / 2;
	ground.material.map.repeat.set( 64, 64 );
	ground.material.map.wrapS = THREE.RepeatWrapping;
	ground.material.map.wrapT = THREE.RepeatWrapping;
	ground.receiveShadow = true;
	scene.add(ground);

   document.addEventListener("keydown", keydown);
   document.addEventListener("keyup", keyup);

   /*criando os objetos */
   this.createObj();
   this.createShrek();


   renderer = new THREE.WebGLRenderer();
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   renderer.gammaInput = true;
	renderer.gammaOutput = true;

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

   controls = new THREE.OrbitControls( camera, renderer.domElement );

   this.animate();
};



window.onload = this.init;


/*Criação do objeto 1 */
var createObj = function(){
   loader = new THREE.AssimpLoader();
	loader.load('models/assimp/octaminator/Octaminator.assimp', function (result) {

      object = result.object;
      object.position.y = 250;
      scene.add(object) ;
      animation = result.animation;
   });

};

var createShrek = function(){
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var loader = new THREE.MTLLoader();
    loader.load('shrek/source/CHARACTER_Shrek/CHARACTER_Shrek.mtl', function (materials) {

        materials.preload();

        var objloader = new THREE.OBJLoader();
        objloader.setMaterials(materials)

        objloader.load('shrek/source/CHARACTER_Shrek/CHARACTER_Shrek.obj', function (object) {
         scene.add(object);
        });
    });
}

var keydown = function(event){
   controls[event.keyCode] = true;
}

var keyup = function(event){
   controls[event.keyCode] = false;
}

var animate = function(){
   requestAnimationFrame( animate, renderer.domElement );

   var delta = clock.getDelta();
	var moveDistance = 200 * delta;
	var rotateAngle = Math.PI / 2 * delta;


   /*W*/
   if(controls[87]){
      object.translateZ( -moveDistance );
   }
   /*S*/
   if(controls[83]){
      object.translateZ(  moveDistance );
   }
   /*A*/
   if(controls[65]){
      object.translateX( -moveDistance );
   }
   /*D*/
   if(controls[68]){
      object.translateX(  moveDistance );
   }

   if(controls[37]){
      object.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
   }

   if(controls[39]){
      object.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
   }

   var camerarelativa = new THREE.Vector3(0,250,1000);
	var cameraOffset = camerarelativa.applyMatrix4( object.matrixWorld );
	camera.position.x = cameraOffset.x;
	camera.position.y = cameraOffset.y;
	camera.position.z = cameraOffset.z;
	camera.lookAt( object.position );


	renderer.render( scene, camera );
	if ( animation ) animation.setTime( performance.now() / 1000 );
};




