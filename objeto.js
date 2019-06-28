var scene;
var camera1, camera2;
var renderer;

var angle = 0;
var radius = 100;
var flagAprox = 0;
var precisaoBezier = 50;

var psyduck = new THREE.Object3D();
var lamp = new THREE.Object3D();

var cameraSelector = false;

var points;

var init = function() {

    /*criando cenario */
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    /*inicializando camera1 e camera2 */
    camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera1.position.z = 200;
    camera1.position.y = 20;

    camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera2.position.z = 200;
    camera2.position.y = 20;

    var curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3( -10, 0, 0 ),
      new THREE.Vector3( 100, 15, 0 ),
      new THREE.Vector3( -15, 150, 0 ),
      new THREE.Vector3( -15, 0, 0 )
   );
   
   points = curve.getPoints(precisaoBezier);
   var geometry = new THREE.BufferGeometry().setFromPoints( points );
   var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
   
   // Create the final object to add to the scene
   var curveObject = new THREE.Line( geometry, material );

   scene.add(curveObject);

   document.addEventListener("keydown", movement);

    /* ilumi*/
	var ambientLight = new THREE.AmbientLight(0xcccccc,0.4);
	scene.add(ambientLight);
	var pointLight = new THREE.PointLight(0xffffff,0.8);
	camera1.add(pointLight);
	scene.add(camera1);

   /*criando os objetos */
   this.createObj();
   this.createObj1();

   /*O renderizador utilizado é o WebGL*/
   renderer = new THREE.WebGLRenderer();
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);

   this.createPlane();

   this.render();
};

window.onload = this.init;

/*funcao para mover o objeto Obj1 e mudar de posicao a camera */
function movement(event) {
   //var matrixRotationW = new THREE.Matrix4().makeRotationY(1,5708);

    key = String.fromCharCode(event.which);

   if (key == "W"){
      psyduck.position.x = psyduck.position.x - 1;
   } else if (key == "S"){
      psyduck.position.x = psyduck.position.x + 1;
   } else if (key == "D"){
      psyduck.position.z = psyduck.position.z - 1;
   } else if (key == "A"){
      psyduck.position.z = psyduck.position.z + 1;
   }

   if (key == "1"){
      cameraSelector = true;
   } else if (key == "2"){
      cameraSelector = false;
   }

};

var i_curva = 0;
var moverPatoBezier = function(points){
  // var i;

      //for(let i = 0; i <= precisaoBezier; i+=1){
         psyduck.position.x = points[i_curva].x;
         psyduck.position.y = points[i_curva].y;
         psyduck.position.z = points[i_curva].z;
        // sleep(500);
      //}
   i_curva+=1;
}

/*Criação do objeto 1 */
var createObj = function(){
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var loader = new THREE.MTLLoader();
    loader.load('Street_Lamp/StreetLamp.mtl', function (materials) {

        materials.preload();

        var objloader = new THREE.OBJLoader();
        objloader.setMaterials(materials)

        objloader.load('Street_Lamp/StreetLamp.obj', function (object) {
         var matrix = new THREE.Matrix4().makeScale(2, 2, 2);
         object.applyMatrix(matrix);

         lamp.add(object);
			scene.add(lamp);
        });
    });
}

/*Criação do objeto 2 */
var createObj1 = function(points){
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var loader = new THREE.MTLLoader();
    loader.load('psyduck/psyduck.mtl', function (materials) {

        materials.preload();

        var objloader = new THREE.OBJLoader();
        objloader.setMaterials(materials)

        objloader.load('psyduck/psyduck.obj', function (object) {

            object.rotation.z = 90 * Math.cos(0);
            object.rotation.x = 45 * Math.cos(180);

            var matrix = new THREE.Matrix4().makeTranslation(-100, 0, 0);
            object.applyMatrix(matrix);

            var matrixS = new THREE.Matrix4().makeScale(0.03, 0.03, 0.03);
            object.applyMatrix(matrixS);

			psyduck.add(object);
         scene.add(psyduck);
        });
    });
}

var i_render = 0;
var render = function() {
    requestAnimationFrame(render);

   if (cameraSelector){
      this.camera1Position();
      renderer.render (scene, camera1);
   }
   else{
      this.camera2Position();
      renderer.render (scene, camera2);
   }

    if(i_render == 0){
        this.moverPatoBezier(points);
    }
    if(i_render == 1)
        i_render = -1;
    
    i_render+=1;
    
  
};

/*Criar um plano embaixo do objeto*/
var createPlane = function() {
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    scene.add(plane);
};

/*posicionar a camera 1*/
var camera1Position = function() {

    camera1.lookAt(scene.position);
    camera1.position.x = radius * Math.cos(angle);
    camera1.position.z = radius * Math.sin(angle);
    camera1.position.y = 80;
    //angle -= 0.01;
}
/*posicionar a camera 2*/
var camera2Position = function() {

    camera2.lookAt(scene.position);
    camera2.position.x = radius * Math.cos(angle);
    camera2.position.z = radius * Math.sin(20);
    camera2.position.y = 130;
    //angle += 0.01;
}

function sleep(milliseconds) {
   var start = new Date().getTime();
   for (var i = 0; i < 1e7; i++) {
     if ((new Date().getTime() - start) > milliseconds){
       break;
     }
   }
}