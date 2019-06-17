
var renderer, scene, camera, texture, cube;
var cubes = [];
window.onload = function init() {
    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    // position and point the camera to the center of the scene
    camera.position.set(25, 25, 30)

    camera.lookAt(scene.position);
    controls = new THREE.OrbitControls(camera)

    // light
    const light = new THREE.SpotLight(0xffffff)
    light.castShadow = true
    light.position.set(15, 15, 15)
    scene.add(light)

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader()

    texture = loader.load("img/partial-transparency.png")
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)

    
    cube = new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            transparent: true,
            map: texture
        })
    )
    cube.castShadow = true
    cube.receiveShadow = true
    scene.add(cube)

    animate()

}

function animate() {
    cube.needsUpdate = true
    texture.offset.x -= 0.1
    texture.offset.y *= 0.1

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}