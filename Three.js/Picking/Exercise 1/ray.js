var renderer, scene, camera, cube1, cube2, mouse = { x: 0, y: 0 }, raycaster;
var cubes = [];
window.addEventListener("mousedown", onMouseClick, false)
window.onload = function init() {
    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);

    // position and point the camera to the center of the scene
    camera.position.set(100, 100, 100)

    camera.lookAt(scene.position);

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    var size = 100;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    raycaster = new THREE.Raycaster()
    var mouse = new THREE.Vector2();

    cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    )
    cube1.position.x = -50
    cube1.name = "cube1"
    scene.add(cube1)

    cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    )
    cube2.position.x = 50
    cube2.name = "cube2"
    scene.add(cube2)

    animate()

}

function onMouseClick(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children)

    intersects.forEach(intersection => {
        if (intersection.object.name === "cube1") {
            cube1.rotation.x += 0.1
            cube1.rotation.y += 0.1
            cube1.rotation.z += 0.1
        }
        if (intersection.object.name === "cube2") {
            cube2.rotation.x += 0.1
            cube2.rotation.y += 0.1
            cube2.rotation.z += 0.1
        }
    })

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}