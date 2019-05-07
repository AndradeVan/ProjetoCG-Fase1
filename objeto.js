var scene;
var camera;
var renderer;

var angle = 0;
var radius = 100;
var flagAprox = 0;

var init = function() {

    /*criando cenario */
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 125;

   var ambientLight = new THREE.AmbientLight(0xcccccc,0.4);
   scene.add(ambientLight);
   var pointLight = new THREE.PointLight(0xffffff,0.8);
   camera.add(pointLight);
   scene.add(camera);

    /*criacao do objeto */
    this.createObj();

    /*O renderizador utilizado é o WebGL*/
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createPlane();
    this.render();
};

window.onload = this.init;

/* funcao de criacao do objeto */
var createObj = function(){
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var loader = new THREE.MTLLoader();
    loader.load('Skull_v3/12140_Skull_v3_L2.mtl', function (materials) {

        materials.preload();

        var objloader = new THREE.OBJLoader();
        objloader.setMaterials(materials);

        /* atribui posicoes do objeto, e o adiciona a cena */
        objloader.load('Skull_v3/12140_Skull_v3_L2.obj', function (object) {
            object.position.set(0,10,-15);
            object.rotation.set(-45,0,0);
         scene.add(object);
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

/* funcao de rotacao da camera em volta do objeto */
var cameraRotation = function() {

    camera.lookAt(scene.position);
    camera.position.x = radius * Math.cos(angle);
    camera.position.z = radius * Math.sin(angle);
    camera.position.y = 25;
    angle += 0.01;
}
