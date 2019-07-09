var scene;
var camera1, camera2;
var renderer;
var crate,crate1;

var controls;
var animation;
var colisao = [];
var clock;
var controls;

var polvo;


var init = function() {

   /*criando cenario */
   scene = new THREE.Scene();
   scene.background = new THREE.Color(0x77dd77);
   /*parte do fundo branco*/
   scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );
   clock = new THREE.Clock();

    /*inicializando camera1 e camera2 */
   camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
   camera1.position.set(0,1000,2200);
	camera1.lookAt(scene.position);
   scene.add(camera1);

   camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
   camera2.position.set(1000,1800,2000);
   camera2.lookAt(scene.position);
   scene.add(camera2);

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

   var criarTextura = new THREE.TextureLoader().load("metalbox_diffuse.png");
   crate = new THREE.Mesh(
      new THREE.BoxGeometry(400,400,400),
      new THREE.MeshPhongMaterial({color:0xffffff, map:criarTextura})
   );
   scene.add(crate);
   crate.position.set(0,250,-500);
   colisao.push(crate);

   //var textura = new THREE.TextureLoader();
   var criarTextura = new THREE.TextureLoader().load("metalbox_bump.png");

   crate1 = new THREE.Mesh(
      new THREE.BoxGeometry(400,400,400),
      new THREE.MeshPhongMaterial({color:0xffffff,

         map:criarTextura
      })
   );
   scene.add(crate1);
   crate1.position.set(1000,250,-500);
   colisao.push(crate1);

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
   this.createPolvo();
   this.createShrek();


   renderer = new THREE.WebGLRenderer();
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   renderer.gammaInput = true;
	renderer.gammaOutput = true;

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

   controls = new THREE.OrbitControls( camera1, renderer.domElement );

   this.animate();
};

window.onload = this.init;


var createPolvo = function(){
   var loader = new THREE.AssimpLoader();
	loader.load('models/assimp/octaminator/Octaminator.assimp', function (result) {

      polvo = result.object;
      polvo.position.y = 250;
      scene.add(polvo);
      animation = result.animation;
   });

};

var createShrek = function(){
   var mtlLoader = new THREE.MTLLoader();
   mtlLoader.setPath( 'shrek/source/CHARACTER_Shrek' );
   mtlLoader.load( 'CHARACTER_Shrek.mtl', function( materials ) {

       materials.preload();

       var objLoader = new THREE.OBJLoader();
       objLoader.setMaterials( materials );
       objLoader.setPath( 'shrek/source/CHARACTER_Shrek' );
       objLoader.load( 'CHARACTER_Shrek.obj', function ( object ) {

           object.position.y = 250;
           scene.add( object );

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
   render();
   movement();
};

var cameraSelector = false;
var render = function(){
   if(cameraSelector){
      renderer.render( scene, camera2 );
   }
   else{
      renderer.render( scene, camera1 );
   }

	if ( animation ) animation.setTime( performance.now() / 1000 );
}

var movement = function(){

   var delta = clock.getDelta();
	var moveDistance = 500 * delta;
	var rotateAngle = Math.PI / 2 * delta;

   if(controls[87]){
      polvo.translateZ( -moveDistance );
   }

   if(controls[83]){
      polvo.translateZ(  moveDistance );
   }

   if(controls[65]){
      polvo.translateX( -moveDistance );
   }

   if(controls[68]){
      polvo.translateX(  moveDistance );
   }

   if(controls[37]){
      polvo.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
   }

   if(controls[39]){
      polvo.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
   }

   //camera selector
   if(controls[49]){
      cameraSelector = false;
   }
   if(controls[50]){
      cameraSelector = true;
   }

   camera1.lookAt(polvo.position);
}
