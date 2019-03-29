let renderer, scene, camera, controls

// once everything is loaded, we run our Three.js stuff
window.onload = function init() {
    /*********************
     * SCENE 
     * *******************/
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene()


    /*********************
     * CAMERA 
     * *******************/
    // create a camera, which defines where we're looking at
    let aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100)
    camera.position.z = 20
    camera.position.y = 5
    controls = new THREE.OrbitControls(camera)

    /*********************
     * RENDERER 
     * *******************/
    // create a render and set the size
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    // configure renderer clear color
    renderer.setClearColor("#000000")

    // add the output of the renderer to an HTML element (this case, the body)
    document.body.appendChild(renderer.domElement)


    let geometry = new THREE.PlaneGeometry(20, 20)
    let material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide
    })
    let plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = -Math.PI / 2
    scene.add(plane)

    let axesHelper = new THREE.AxesHelper(100)
    scene.add(axesHelper)


    let house1 = createHouse(2, 3, 4)
    let mat1 = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide
    })
    let h1 = new THREE.Mesh(house1, mat1)
    scene.add(h1)



    let house2 = createHouse(2, 3, 4)
    let mat2 = new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide
    })
    let h2 = new THREE.Mesh(house2, mat2)
    h2.position.set(-5,0,0);
    scene.add(h2)

    // scene.rotation.set(90, 0, 0)
    /*****************************
     * ANIMATE 
     * ***************************/
    // call the animate function
    animate()
}

function createHouse(width, height, length) {
    let houseGeometry = new THREE.Geometry()

    houseGeometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(width, 0, 0),
        new THREE.Vector3(0, 0, length),
        new THREE.Vector3(width, 0, length),
        new THREE.Vector3(width, height, length),
        new THREE.Vector3(0, height, length),
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(width, height, 0),
        new THREE.Vector3(width / 2, height + height / 2, 0),
        new THREE.Vector3(width / 2, height + height / 2, length)
    )

    houseGeometry.faces.push(
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(1, 2, 3),
        new THREE.Face3(2, 3, 4),
        new THREE.Face3(2, 4, 5),
        new THREE.Face3(2, 5, 6),
        new THREE.Face3(0, 2, 6),
        new THREE.Face3(0, 1, 6),
        new THREE.Face3(1, 6, 7),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(1, 4, 7),
        new THREE.Face3(5, 6, 8),
        new THREE.Face3(5, 8, 9),
        new THREE.Face3(4, 5, 9),
        new THREE.Face3(6, 7, 8),
        new THREE.Face3(4, 7, 9),
        new THREE.Face3(7, 8, 9)
    )

    houseGeometry.computeFaceNormals()

    return houseGeometry
}

function animate() {

    // animate using requestAnimationFrame
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}


