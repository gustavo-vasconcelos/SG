let renderer, scene, camera, controls, upperArm

window.onload = function init() {
    scene = new THREE.Scene()

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

    shoulder = new THREE.Object3D
    scene.add(shoulder)

    upperArm = new THREE.Mesh(
        new THREE.BoxGeometry(8, 2, 2),
        new THREE.MeshNormalMaterial({ wireframe: true })
    )
    shoulder.add(upperArm)

    elbow = new THREE.Mesh(
        new THREE.BoxGeometry(8, 2, 2),
        new THREE.MeshNormalMaterial({ wireframe: true })
    )
    shoulder.add(elbow)

    elbow.position.set(-8, 0, 0)


    animate()
}

function animate() {

    // animate using requestAnimationFrame
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}


