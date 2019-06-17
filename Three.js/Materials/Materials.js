
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
    function addCube() {
        const size = randomIntFromInterval(3, 6)
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(size, size, size),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        )
        const position = {
            x: randomIntFromInterval(-50, 50),
            y: randomIntFromInterval(0, 10),
            z: randomIntFromInterval(-50, 50)
        }
        cube.position.set(position.x, position.y, position.z)
        cube.receiveShadow = true
        cube.castShadow = true
        scene.add(cube)
        cubes.push(cube)
    }

    for (var i = 0; i < 100; i++) {
        addCube(i)
    }

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

    switch (key) {
        case "A":
            cubes.forEach(cube => {
                cube.material = faceMaterials
                cube.geometry.faces.forEach((face, index) => {
                    face.material = faceMaterials[index]
                })
            })
            break
        case "D":
            cubes.forEach(cube => {
                cube.material = new THREE.MeshDepthMaterial()
            })
            break
        case "F":
            cubes.forEach(cube => {
                for (let j = 0; j < 12; j++) {
                    const r = Math.random()
                    const g = Math.random()
                    const b = Math.random()

                    cube.geometry.faces[j].color.setRGB(r, g, b)
                }

                cube.material = new THREE.MeshBasicMaterial({
                    vertexColors: THREE.VertexColors
                })
                cube.geometry.colorsNeedUpdate = true
            })
            break
        case "L":
            cubes.forEach(cube => {
                cube.material = new THREE.MeshLambertMaterial({ color: 0x7833aa })
            })
            break
        case "N":
            cubes.forEach(cube => {
                cube.material = new THREE.MeshNormalMaterial()
            })
            break
        case "P":
            cubes.forEach(cube => {
                cube.material = new THREE.MeshPhongMaterial({
                    color: 0x7833aa,
                    shininess: 10,
                    specular: 0x00FF00
                })
            })
            break
        case "W":
            cubes.forEach(cube => {
                cube.visible = false
            })
            for (let i = 0; i < 100; i++) {
                const size = randomIntFromInterval(3, 6)
                const cube = new THREE.SceneUtils.createMultiMaterialObject(
                    new THREE.BoxGeometry(size, size, size),
                    [
                        new THREE.MeshDepthMaterial(),
                        new THREE.MeshBasicMaterial({
                            color: 0x00ff00,
                            wireframe: true,
                            transparent: true,
                            blending: THREE.MultiplyBlending
                        })
                    ]
                )
                const position = {
                    x: randomIntFromInterval(-50, 50),
                    y: randomIntFromInterval(0, 10),
                    z: randomIntFromInterval(-50, 50)
                }
                cube.position.set(position.x, position.y, position.z)
                cube.receiveShadow = true
                cube.castShadow = true
                cube.name = "multiMaterial"
                console.log(cube.name)
                scene.add(cube)
                cubes.push(cube)
            }
            break
        default:
            /*
            cubes.splice(49, 100)
            for (let i = scene.children.length - 1; i >= 0; i--) {
                if (scene.children[i].name === "multiMaterial") {
                    scene.children[i].remove()
                }
                
            }
            */
            for (var i = 0; i < cubes.length; i++) {
                var color = new THREE.Color(0xffffff);
                color.setRGB(Math.random(), Math.random(), Math.random());
                cubes[i].material = new THREE.MeshBasicMaterial({ color: color });
                cubes[i].visible = true;
            }
            break;
    }
    renderer.render(scene, camera);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}