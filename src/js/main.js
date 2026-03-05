var scene    = null,
    camara   = null,
    render   = null,
    controls = null;

var cube = null;

function start() {
    window.onresize = onWindowResize;
    initScene();
    animate();
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xe0e0d1 );

    camera = new THREE.PerspectiveCamera( 
        75,                                     // Ángulo "grabación" - De abaja -> Arriba 
        window.innerWidth / window.innerHeight, // Relación de aspecto 16:9
        0.1,                                    // Mas cerca (no renderiza) 
        1000                                    // Mas lejos (no renderiza)
    );

    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 1, 2 );
    controls.update();

    // Grid Creation 
    var size = 50;
    var divisions = 50;

    var gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    var axesHelper = new THREE.AxesHelper( 1 );
    scene.add( axesHelper );
}

function animate() {
    requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function getBuildingData() {
    var message = 'Ingrese el número de edificios a crear: ';
    var datas = prompt(message,"3");

    // Este parte lo hace la cantidad de veces (segun la cantidad de edificios)
    var message2 = 'Ingrese el número de pisos, color y wireframe del edificio #?: ';
    var datas2 = prompt(message2,"3,ff0000,false");

    var values = cleanParamsUI(datas2, ',');

    alert.log("Numero de pisos: "+values[0]);
    alert.log("Color: "+values[1]);
    alert.log("Wireframe: "+values[2]);

    drawElement();
}

function drawElement() {
    // aqui va toda la logica de dibujar el edificio, usando los datos que se ingresaron en el prompt
    alert("creo el edificio con los datos ingresados");
}

function cleanParamsUI(datos, marker) {
    value = datos.split(marker);
    for(var i=0; i<value.length; i++){
        value[i] = parseFloat(value[i]);
    }
    return value;
}