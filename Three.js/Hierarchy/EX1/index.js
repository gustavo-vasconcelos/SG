let cube, cubePivot, sphere, spherePivot, cone
let renderer, scene, camera, coneGeometry

let movement = -1 //static objects

// once everything is loaded, we run our Three.js stuff
function init() {

    let canvas = document.getElementById("webglcanvas")

    /*********************
     * SCENE 
     * *******************/
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene()

    /*********************
     * CAMERA 
     * *******************/
    // create a camera, which defines where we're looking at
    let aspect = canvas.width / canvas.height
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100)
    camera.position.set(2, 2, 15)
    const controls = new THREE.OrbitControls(camera)

    /*********************
     * RENDERER 
     * *******************/
    // create a render and set the size
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setSize(canvas.width, canvas.height)

    // configure renderer clear color
    renderer.setClearColor("#000000")

    /*****************************
     * CUBE 
     * ***************************/

    cubePivot = new THREE.Object3D
    scene.add(cubePivot)

    cube = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2, 10, 10, 10),
        new THREE.MeshNormalMaterial({ wireframe: true }))
    // add the cube to the scene
    cubePivot.add(cube)


    /*****************************
     * SPHERE 
     * ***************************/
    spherePivot = new THREE.Object3D
    cubePivot.add(spherePivot)

    sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 10, 10),
        new THREE.MeshNormalMaterial({ wireframe: true }))
    // sphere is cube's child
    spherePivot.add(sphere)

    // rotate the cube around its axes
    sphere.position.set(3, 3, 0)


    cone = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 30),
        new THREE.MeshNormalMaterial({ wireframe: true })
    )

    cone.position.set(7, 0, 0)
    spherePivot.add(cone)



    /*************************
     * AXES HELPER
     *************************/
    // show SCENE axes
    let axes = new THREE.AxesHelper(2)
    scene.add(axes)




    // Add key handling
    document.onkeydown = handleKeyDown


    // Run the animation loop
    animate()
}

function handleKeyDown(event) {
    let char = String.fromCharCode(event.keyCode)
    switch (char) {
        case "1":
        case "2":
            movement = parseInt(char)
            break
        case "3":
            movement = parseInt(char)
            break
        case "4":
            movement = parseInt(char)
            break
        case "5":
            movement = parseInt(char)
            break
        default:
            movement = -1
            break
    }
}

function animate() {
    switch (movement) {
        case 1:
            // Rotate cube about its Y axis
            cube.rotation.y += 0.02
            break
        case 2:
            // Rotate the sphere about its Y axis
            sphere.rotation.y += 0.02
            break
        case 4:
            // Rotate the sphere about its Y axis
            cubePivot.rotation.y += 0.02
            break
        case 5:
            // Rotate the sphere about its Y axis
            cone.rotation.x += 0.02
            break
        default:
            // Reset 
            cube.rotation.y = 0
            sphere.rotation.y = 0
            break
    }

    // animate using requestAnimationFrame
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

