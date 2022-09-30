import * as THREE from './build/three.module.js';
import * as dat from './jsm/libs/lil-gui.module.min.js';
// import { FlyControls } from './FlyControls.js';
// import { FirstPersonControls } from './modules/FirstPersonControls.js';
// import { FlyControls } from 'three/addons/controls/FlyControls.js';
// scene
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.00000025);

// viewport size variables
const MARGIN = 0;
let screenHeight = window.innerHeight - MARGIN * 2;
let screenWidth = window.innerWidth;

// camera
const camera = new THREE.PerspectiveCamera(
    75,
    screenWidth / screenHeight,
    0.1,
    1000
);
camera.position.z = 3;
scene.add(camera);

// canvas
const canvas = document.querySelector('#canvas');

// console.log(FirstPersonControls);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// controls
// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.update();
// renderer.render(scene, camera);
// console.log(flyControls);

// const firstPersonControls = new FirstPersonControls(camera, canvas);
// firstPersonControls.update();
// renderer.render(scene, camera);
// console.log(firstPersonControls);
// light
const sceneLight = new THREE.AmbientLight(0xfffeee, 1);
scene.add(sceneLight);

// loaders
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
// const cubeTextureLoader = new THREE.CubeTextureLoader();

// textures
const matcapFlatGreen = textureLoader.load('./assets/matcap-shiny-flat-green.png');

// clock and animation function
// const clock = new THREE.Clock();

const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    // const delta = clock.getDelta();
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
    // flyControls.update(1.0);
    // firstPersonControls.update(1.0);
}

tick();


// mouse movement tracker
const cursor = {
    x: 0,
    y: 0,
};

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / window.innerWidth - 0.5;
    cursor.y = - (event.clientY / window.innerHeight - 0.5);
    console.log(event.clientX);
});


// window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}

window.addEventListener('resize', onWindowResize, false);

// cube
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshMatcapMaterial({
        matcap: matcapFlatGreen,
    }),
);
scene.add(cube);

// gui
const gui = new dat.GUI();
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 1.5, 10)
cameraFolder.open()


