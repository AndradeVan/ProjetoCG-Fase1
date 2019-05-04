var scene;
var camera;
var renderer;
var cube;
var geometry;

/*Utilização da biblioteca three.js */

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    /*O renderizador utilizado é o WebGL*/
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    this.createACube();
    this.createPlane();

    camera.position.z = 5;
    /*Quando chamamos scene.add ele é direcionado para ( 0, 0, 0 )*/ 
    this.render();

};

window.onload = this.init;
/*Qualquer coisa que queiramos mover ou 
mudar enquanto o app está rodando deve ser colocado dentro do render. */
var render = function() {
    requestAnimationFrame( render );
    this.animateCube();
    renderer.render( scene, camera );  
};

var createACube = function() {

    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    
    geometry.faces[0].color.setHex(0xffffff);
    geometry.faces[1].color.setHex(0xffffff);
    geometry.faces[2].color.setHex(0x009b48);
    geometry.faces[3].color.setHex(0x009b48);
    geometry.faces[4].color.setHex(0xffd500);
    geometry.faces[5].color.setHex(0xffd500);
    geometry.faces[6].color.setHex(0x0045ad);
    geometry.faces[7].color.setHex(0x0045ad);
    geometry.faces[8].color.setHex(0xb90000);
    geometry.faces[9].color.setHex(0xb90000);
    geometry.faces[10].color.setHex(0xff5900);
    geometry.faces[11].color.setHex(0xff5900);


    var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors  } );
    
    cube = new THREE.Mesh( geometry, material );
    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = 0;
    //ou
    //cube.position.set(2, 1, -1)
    scene.add( cube );
};

/*Criar um plano embaixo do objeto*/
var createPlane = function() {
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -1;
    scene.add(plane);
};

/* rodacionar objeto */
var animateCube = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
}