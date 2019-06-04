var scene;
var camera;
var renderer;

var angle = 0;
var radius = 100;
var flagAprox = 0;

var psyduck = new THREE.Object3D();
var lamp = new THREE.Object3D();

var init = function() {

    /*criando cenario */
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 200;
    camera.position.y = 20;

    document.addEventListener("keydown", movement);

    /* ilumi*/
	var ambientLight = new THREE.AmbientLight(0xcccccc,0.4);
	scene.add(ambientLight);
	var pointLight = new THREE.PointLight(0xffffff,0.8);
	camera.add(pointLight);
	scene.add(camera);


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

function movement(event) {
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

};

/*Criação do objeto */
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

var createObj1 = function(){
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var loader = new THREE.MTLLoader();
    loader.load('psyduck/psyduck.mtl', function (materials) {

        materials.preload();

        var objloader = new THREE.OBJLoader();
        objloader.setMaterials(materials)

        objloader.load('psyduck/psyduck.obj', function (object) {

            /**/
            //object.position.set(-1000,-110,350);
            object.rotation.z = 90 * Math.cos(0);
            object.rotation.x = 45 * Math.cos(180);
            //object.position.y = 400;
            //Object.position.x = radius * Math.cos(angle);
            //Object.position.z = radius * Math.sin(angle);

            var matrix = new THREE.Matrix4().makeTranslation(-100, 0, 0);
            object.applyMatrix(matrix);

            var matrixS = new THREE.Matrix4().makeScale(0.03, 0.03, 0.03);
            object.applyMatrix(matrixS);


			psyduck.add(object);
         scene.add(psyduck);
        });
    });
}

var render = function() {
    requestAnimationFrame(render);
    this.cameraRotation();
    renderer.render(scene, camera);

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

/*funcao para a rotação da camera */
var cameraRotation = function() {

    camera.lookAt(scene.position);
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.position.y = 25;
    //angle += 0.01;
}

