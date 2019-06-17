
var renderer, scene, camera, earth, clouds, galaxy, loadManager, materials;
var cubes = [];
window.onload = function init() {
    //scene
    scene = new THREE.Scene();

    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
    // position and point the camera to the center of the scene
    camera.position.z = 3
    camera.lookAt(scene.position);
    controls = new THREE.OrbitControls(camera)

    // light
    const sunlight = new THREE.DirectionalLight(0xffffff, 1)
    sunlight.position.set(5, 3, 5)
    scene.add(sunlight)

    const ambientLight = new THREE.AmbientLight(0x333333)
    scene.add(ambientLight)

    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    //show canvas
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader(loadManager);

    earth = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshPhongMaterial({
            map: loader.load("img/no_clouds_4k.jpg"),
            bumpMap: loader.load("img/elev_bump_4k.jpg"),
            bumpScale: 0.02
        }),
    )
    earth.rotation.z = -0.2
    scene.add(earth)

    clouds = new THREE.Mesh(
        new THREE.SphereGeometry(1.01, 32, 32),
        new THREE.MeshPhongMaterial({
            map: loader.load("img/fair_clouds_4k.png"),
            transparent: true
        })
    )
    scene.add(clouds)

    galaxy = new THREE.Mesh(
        new THREE.SphereGeometry(100, 32, 32),
        new THREE.MeshPhongMaterial({
            map: loader.load("img/galaxy_starfield.png"),
            side: THREE.BackSide
        })
    )
    scene.add(galaxy)


    animate()

}

function animate() {
    earth.rotation.y -= 0.001
    clouds.rotation.y -= 0.0005

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}