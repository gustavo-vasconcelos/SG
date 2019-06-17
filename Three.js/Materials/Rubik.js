
var renderer, scene, camera;
var cubes = [];
window.onload = function init() {
    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 200);
    // position and point the camera to the center of the scene
    camera.position.set(-5, 5, 100);
    camera.lookAt(scene.position);
    controls = new THREE.OrbitControls(camera)

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    //cubes

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube1.position.set(0, 0, 0)

    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube2.position.set(3, 0, 0)

    const cube3 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube3.position.set(6, 0, 0)

    const cube4 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube4.position.set(0, 3, 0)

    const cube5 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube5.position.set(3, 3, 0)

    const cube6 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube6.position.set(6, 3, 0)

    const cube7 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube7.position.set(0, 6, 0)

    const cube8 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube8.position.set(3, 6, 0)

    const cube9 = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        faceMaterials
    )
    cube9.position.set(6, 6, 0)
    
    scene.add(cube1)
    scene.add(cube2)
    scene.add(cube3)
    scene.add(cube4)
    scene.add(cube5)
    scene.add(cube6)
    scene.add(cube7)
    scene.add(cube8)
    scene.add(cube9)


    const ambientLight = new THREE.AmbientLight(0xffffff, .5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1.5)
    pointLight.position.set(0, 25, 80)
    scene.add(pointLight)




    renderer.render(scene, camera);

}

const faceMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x009e60 }),
    new THREE.MeshBasicMaterial({ color: 0x0051ba }),
    new THREE.MeshBasicMaterial({ color: 0xffd500 }),
    new THREE.MeshBasicMaterial({ color: 0xff5800 }),
    new THREE.MeshBasicMaterial({ color: 0xc41e3a }),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
]

//----------------------------------------------------------------------------
// Keyboard Event Functions
//----------------------------------------------------------------------------
document.onkeydown = function handleKeyDown(event) {
    //Get unshifted key character
    var key = String.fromCharCode(event.keyCode);

    // console.log(key)

    renderer.render(scene, camera);
}