
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(38, 1080 / 1080, 0.1, 500);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'eye';


//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `models/NEWS.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); //Alpha: true allows for the transparent background
renderer.setSize(2160, 2160);


//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "eye" ? 1.5 : 10;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 0.1); // (color, intensity)
topLight.position.set(1000, -2000, -1000) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const topLight2 = new THREE.DirectionalLight(0x404040, 0.5); // (color, intensity)
topLight2.position.set(-1000, -200, 500) //top-left-ish
topLight2.castShadow = true;
scene.add(topLight2);


//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "dino") {
 //controls = new OrbitControls(camera, renderer.domElement);
 
}

const light = new THREE.AmbientLight( 0x404040, 3.2 ); // soft white light
scene.add( light );

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  scene.rotation.y += 0.008;
  

  //Make the eye move
  if (object && objToRender === "eye") {
    //I've played with the constants here until it looked good 

    
    scene.rotation.x =  (mouseY * 0.8 / window.innerHeight) - 0.4;
    //object.rotation.y += 0.01;
    //object.rotation.y += 0.01;
    object.rotation.y =  + scrollY / 750;
  }



  renderer.render(scene, camera);
}



//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = 1080 / 1080;
  camera.updateProjectionMatrix();
  renderer.setSize(1080, 1080);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

let scrollY = window.scrollY


window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY

    console.log(scrollY)
})




//Start the 3D rendering
animate();



//---------------------------------------------------


