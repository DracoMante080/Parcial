var scene = null,
    camera = null,
    renderer = null,
    controls = null;

function start() {
    window.onresize = onWindowResize;
    initScene();
    animate();
}

function initScene() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0d1);

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.set(5, 6, 10);
    controls.update();

    var gridHelper = new THREE.GridHelper(50, 50);
    scene.add(gridHelper);

    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function getBuildingData() {

    var numBuildings = parseInt(prompt("Ingrese el número de edificios a crear:", "3"));

    for (var i = 0; i < numBuildings; i++) {

        var data = prompt(
            "Ingrese el número de pisos, color y wireframe del edificio #" + (i + 1),
            "3,ff0000,false"
        );

        var values = data.split(",");

        var floors = parseInt(values[0]);
        var color = parseInt(values[1], 16);
        var wireframe = values[2] === "true";

        drawElement(i * 5, floors, color, wireframe);
    }
}


function drawElement(xPos, floors, color, wireframe) {

    var floorHeight = 1.5;

    for (var i = 0; i < floors; i++) {

        var geometry = new THREE.BoxGeometry(2, floorHeight, 2);

        var material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: wireframe
        });

        var floor = new THREE.Mesh(geometry, material);

        floor.position.x = xPos;
        floor.position.y = (i * floorHeight) + floorHeight / 2;

        scene.add(floor);

        createWindows(xPos, i, floorHeight);
    }
}

function createWindows(xPos, floorIndex, floorHeight) {

    var windowGeometry = new THREE.PlaneGeometry(0.5, 0.5);

    var windowMaterial = new THREE.MeshBasicMaterial({
        color: 0x87CEEB,
        side: THREE.DoubleSide
    });

    var windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);

    windowMesh.position.set(
        xPos,
        (floorIndex * floorHeight) + 0.75,
        1.01
    );

    scene.add(windowMesh);
}