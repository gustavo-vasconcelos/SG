/* global THREE */

// THREEJS RELATED letIABLES
let scene, renderer, camera

// 3D Models
let sea, sky, plane, propeller

let cockpit, engine, tail, wing, blade, clouds = []

let controls

function globalMaterial(color) {
    return new THREE.MeshPhongMaterial({ color })
}

window.onload = function init() {
    // set up the scene, the camera and the renderer
    createScene()
 
    // add the objects
    createPlane()
    createSea()
    createSky()
    createLights()

    // start a loop that will update the objects' positions 
    // and render the scene on each frame
    animate()
}

//INIT THREE JS, SCREEN, SCENE AND CAMERA
function createScene() {
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene()
    //let axes = new THREE.AxesHelper(600)
    //scene.add(axes)
   
    // create a camera, which defines where we're looking at
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)

    // position the camera
    camera.position.x = 0
    camera.position.z = 200 //notice how far the camera is
    camera.position.y = 100
    
    // create a render and set the size
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    // configure renderer clear color
    renderer.setClearColor("#e4e0ba") 

    // add the output of the renderer to the DIV with id "world"
    document.getElementById('world').appendChild(renderer.domElement)

    // listen to the screen: if the user resizes it we have to update the camera and the renderer size
    window.addEventListener('resize', handleWindowResize, false)
}

function handleWindowResize() {
    // update height and width of the renderer and the camera
    let HEIGHT = window.innerHeight
    let WIDTH = window.innerWidth
    renderer.setSize(WIDTH, HEIGHT)
    camera.aspect = WIDTH / HEIGHT
    camera.updateProjectionMatrix()
}

function createLights() {
    const hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
    
    scene.add(hemisphereLight)
    console.log("Lights created")
}

function createSea() {

    // create the geometry (shape) of the cylinder: radius top, radius bottom, height, number of segments on the radius, number of segments vertically
    let geometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10)
    // rotate the geometry on the x axis (alters the vertices coordinates, DOES NOT alter the mesh axis coordinates )
    geometry.rotateX(-Math.PI / 2)

    // create the material
    let material = new THREE.MeshPhongMaterial({ color: 0x68c3c0, wireframe: false })

    // create the mesh: geometry + material
    sea = new THREE.Mesh(geometry, material)

    // push it a little bit at the bottom of the scene
    sea.position.y = -600

    console.log("Sea created")
    scene.add(sea)
}

class Cloud {
    constructor(x, y, z, zRotation) {
        this.x = x
        this.y = y
        this.z = z
        this.zRotation = zRotation
        this.cubes = []
        this.cloud = new THREE.Object3D()
    }
    
    createCloud() {
        const cubesAmount = randomBetweenInterval(3, 6)
        
        for(let i = 0; i < cubesAmount; i++) {
            const x = i * 15
            const y = randomBetweenInterval(0, 10)
            const z = randomBetweenInterval(0, 10)
            
            
            let cloudCube = new THREE.Mesh(
                new THREE.BoxGeometry(20, 20, 20),
                globalMaterial(0xd8d0d1)
            )
            
            cloudCube.position.x = x
            
            const scale = randomBetweenInterval(0.1, 2, 2)
            const rotation = {
                x: randomBetweenInterval(0, 2 * Math.PI, 2),
                z: randomBetweenInterval(0, 2 * Math.PI, 2)
            }
            
            cloudCube.scale.set(scale, scale, scale)
            cloudCube.rotation.x = rotation.x
            cloudCube.rotation.z = rotation.z
            
            this.cloud.add(cloudCube)
        }
        this.cloud.position.set(this.x, this.y, this.z)
        this.cloud.rotation.z = this.zRotation
    }
}

function randomBetweenInterval(min, max, decimalPlaces = 0) {  
    const rand = Math.random() * (max - min) + min
    const power = Math.pow(10, decimalPlaces)
    return Math.floor(rand * power) / power
}

function createSky() {
    // create an empty container
    sky = new THREE.Object3D()
    // push its center a bit towards the bottom of the screen (like the sea)
    sky.position.y = -600

    //COMPLETE HERE
    const cloudAmount = 20
    
    for(let i = 0; i < cloudAmount; i++) {
        for(let theta = 0; theta <= Math.PI * 2; theta += Math.PI / cloudAmount) {
            clouds.push(new Cloud(cloudAmount * i * 200, randomBetweenInterval(750, 950), randomBetweenInterval(-800, -400), theta))
            clouds[i].createCloud()
            sky.add(clouds[i].cloud)
        }
    }
    
    

    console.log("Sky created")
    scene.add(sky)
}

function createPlane() {
    // create an empty container
    plane = new THREE.Object3D()

    // scale it down
    plane.scale.set(0.25,0.25,0.25)
    // push it up
    plane.position.y = 100


    //COMPLETE HERE
    tail = new THREE.Mesh(
        new THREE.BoxGeometry( 15, 20, 5 ),
        globalMaterial(0xf25346)
    )
    plane.add(tail)
    tail.position.x = -30
    tail.position.y = 25
    
    
    propeller = new THREE.Mesh(
        new THREE.BoxGeometry( 20, 10, 10 ),
        globalMaterial(0x59332e)
    )
    plane.add(propeller)
    propeller.position.x = 50
    
    
    
    blade = new THREE.Mesh(
        new THREE.BoxGeometry( 1, 100, 20 ),
        globalMaterial(0x23190f)
    )
    propeller.add(blade)
    
    
    
    cockpit = new THREE.Mesh(
        new THREE.BoxGeometry( 60, 50, 50 ),
        globalMaterial(0xf25346)
    )
    plane.add(cockpit)
    
    
    
    engine = new THREE.Mesh(
        new THREE.BoxGeometry( 20, 50, 50 ),
        globalMaterial(0xd8d0d1)
    )
    plane.add(engine)
    engine.position.x = 30
    


    wing = new THREE.Mesh(
        new THREE.BoxGeometry( 40, 8, 150 ),
        globalMaterial(0xf25346)
    )
    plane.add(wing)

    console.log("Plane created")
    scene.add(plane)
}


function animate() {
    //ANIMATE THE PROPELLER
    
    // rotate the background (use AxesHelper to verify which axis is the rotation one)
    //sky.rotation.z += 0.01
    sea.rotation.z += 0.005

    // render
    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}



