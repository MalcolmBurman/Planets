import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js'; 
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

////init
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);
const loader = new THREE.TextureLoader();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

////Camera
const fov = 60;
const aspect = w / h;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;
camera.position.y = 0.5;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.enablePan = false;
controls.minDistance = 0.5; 
controls.maxDistance = 40;

////objects
const infoBoxes = {
    earth: document.getElementById('earth'),
    mars: document.getElementById('mars'),
    venus: document.getElementById('venus'),
    mercury: document.getElementById('mercury'),
    jupiter: document.getElementById('jupiter'),
    sun: document.getElementById('sun'),
    saturn: document.getElementById('saturn'), 
    uranus: document.getElementById('uranus'), 
    neptune: document.getElementById('neptune'), 

};
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;

//Earth
const geo = new THREE.IcosahedronGeometry(0.5, 16);
const mat = new THREE.MeshStandardMaterial({map: loader.load("./Textures/earthmap1k.jpg") });
const earthMesh = new THREE.Mesh(geo, mat);
earthGroup.add(earthMesh);

//Moon
const geo2 = new THREE.IcosahedronGeometry(0.2, 16)
const mat2 = new THREE.MeshStandardMaterial({map: loader.load("./Textures/moonmap4k.jpg")});
const moonMesh = new THREE.Mesh(geo2, mat2);
moonMesh.position.y = 2;
scene.add(moonMesh);

//Lights
const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("./Textures/earthlights1k.jpg"),
    blending: THREE.AdditiveBlending
});
const lightMesh = new THREE.Mesh(geo, lightsMat);
earthGroup.add(lightMesh);

//Clouds
const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./Textures/earthcloudmap.jpg"),
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
});
const cloudMesh = new THREE.Mesh(geo, cloudsMat);
cloudMesh.scale.setScalar(1.003);
earthGroup.add(cloudMesh);
cloudMesh.name = "earth";
scene.add(earthGroup);

//Mars
const marsGeo = new THREE.IcosahedronGeometry(0.4, 16);
const marsMat = new THREE.MeshStandardMaterial({map: loader.load("./Textures/marsmap1k.jpg") });
const marsMesh = new THREE.Mesh(marsGeo, marsMat);
marsMesh.position.x = 5;
marsMesh.name = "mars";
scene.add(marsMesh);

//Venus
const venusGeo = new THREE.IcosahedronGeometry(0.4, 16);
const venusMat = new THREE.MeshStandardMaterial({map: loader.load("./Textures/venusmap.jpg") });
const venusMesh = new THREE.Mesh(venusGeo, venusMat);
venusMesh.position.x = -5;
venusMesh.name = "venus";
scene.add(venusMesh);

//Mercury
const mercuryGeo = new THREE.IcosahedronGeometry(0.2, 16);
const mercuryMat = new THREE.MeshStandardMaterial({map: loader.load("./Textures/mercurymap.jpg") });
const mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat);
mercuryMesh.position.x = -10;
mercuryMesh.name = "mercury";
scene.add(mercuryMesh);

//Jupiter
const jupiterGeo = new THREE.IcosahedronGeometry(1.2, 16);
const jupiterMat = new THREE.MeshStandardMaterial({map: loader.load("./Textures/jupiter2_1k.jpg") });
const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
jupiterMesh.position.x = 10;
jupiterMesh.name = "jupiter";
scene.add(jupiterMesh);

//Sun
const sunGeo = new THREE.IcosahedronGeometry(1.5, 16);
const sunMat = new THREE.MeshBasicMaterial({map: loader.load("./Textures/sunmap.jpg") });
const sunMesh = new THREE.Mesh(sunGeo, sunMat);
sunMesh.position.x = -15;
sunMesh.name = "sun";
scene.add(sunMesh);

//Saturn
const saturnGeo = new THREE.IcosahedronGeometry(1.1, 16);
const saturnMat = new THREE.MeshStandardMaterial({map: loader.load("./Textures/saturnmap.jpg") });
const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
saturnMesh.position.x = 15;
saturnMesh.name = "saturn";
scene.add(saturnMesh);


const ringGeometry = new THREE.RingGeometry(1.5, 2.0, 64); // Inner radius, outer radius, and segments

const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffdd,
    side: THREE.DoubleSide, 
    transparent: true, 
    opacity: 0.8,
});


const saturnRingMesh = new THREE.Mesh(ringGeometry, ringMaterial);
saturnRingMesh.rotation.x = Math.PI / 2; // Rotate the rings to face the camera
saturnMesh.add(saturnRingMesh);


const outerRingGeometry = new THREE.RingGeometry(2.5, 3.0, 64);
const outerRingMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffdd,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6,
});

const outerRingMesh = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
outerRingMesh.rotation.x = Math.PI / 2; 

saturnMesh.add(outerRingMesh);

//Uranus
const uranusGeo = new THREE.IcosahedronGeometry(0.9, 16);
const uranusMat = new THREE.MeshStandardMaterial({map: loader.load("./Textures/uranusmap.jpg") });
const uranusMesh = new THREE.Mesh(uranusGeo, uranusMat);
uranusMesh.position.x = 20;
uranusMesh.name = "uranus";
scene.add(uranusMesh);

const uranusRingGeometry = new THREE.RingGeometry(1.5, 2.0, 64); 

const uranusRingMaterial = new THREE.MeshStandardMaterial({
    color: 0x444488,
    side: THREE.DoubleSide, 
    transparent: true, 
    opacity: 0.8,
});


const uranusRingMesh = new THREE.Mesh(uranusRingGeometry, uranusRingMaterial);
uranusRingMesh.position.x = 20;
uranusRingMesh.rotation.x = 1.8;
uranusRingMesh.rotation.y =3.5;
scene.add(uranusRingMesh);

//Neptune
const neptuneGeo = new THREE.IcosahedronGeometry(0.9, 16);
const neptuneMat = new THREE.MeshStandardMaterial({map: loader.load("./Textures/neptunemap.jpg") });
const neptuneMesh = new THREE.Mesh(neptuneGeo, neptuneMat);
neptuneMesh.position.x = 25;
neptuneMesh.name = "neptune";
scene.add(neptuneMesh);


////lights
const sunLight = new THREE.PointLight(0xffffff, 1, 0, 2);
sunLight.position.set(-15, 0, 0);
scene.add(sunLight);

const spotLight = new THREE.SpotLight(0x111111, 2);
spotLight.position.set(30, 5, 0);
scene.add(spotLight);

const stars = getStarfield({numStars: 2000});
scene.add(stars);

////Left and Right Buttons
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

let targetCameraX = camera.position.x;
const smoothSpeed = 0.1; 
let isMoving = false;

leftButton.addEventListener('click', () => {
    if (isMoving) return; 

    if (controls.target.x > -15) {
        isMoving = true; 
        targetCameraX = camera.position.x - 5;
        const newX = controls.target.x - 5;
        smoothMoveTarget(newX);
    }
});

rightButton.addEventListener('click', () => {
    if (isMoving) return; 

    if (controls.target.x < 25) {
        isMoving = true; 
        targetCameraX = camera.position.x + 5;
        const newX = controls.target.x + 5;
        smoothMoveTarget(newX);
    }
});


////Animate
function animate(t = 0){
    requestAnimationFrame(animate);

    //Earth Rotation
    earthGroup.rotation.y = t/3500;
    cloudMesh.rotation.y = t/25000;
    earthGroup.position.y = Math.cos(t*0.0015) / 25;
    //Moon Rotation
    moonMesh.rotation.y = -(t/1000);
    moonMesh.position.x = Math.cos(t*0.001 + 5);
    moonMesh.position.y = Math.cos(t*0.001 + 5);
    moonMesh.position.z = Math.cos(t*0.001 + 10);
    //Marsh Rotation
    marsMesh.position.y = Math.cos(t*0.0015) / 25;
    marsMesh.rotation.y = t/3500;
    //Venus Rotation
    venusMesh.position.y = Math.cos(t*0.0012) / 25;
    venusMesh.rotation.y = t/3500;
    //Mercury Rotation
    mercuryMesh.position.y = Math.cos(t*0.0011) / 25;
    mercuryMesh.rotation.y = t/3500;
    //Jupiter Rotation
    jupiterMesh.position.y = Math.cos(t*0.0017) / 25;
    jupiterMesh.rotation.y = t/3500;
    //Sun Rotation
    sunMesh.position.y = Math.cos(t*0.0015) / 25;
    sunMesh.rotation.y = t/3500;
    //Saturn Rotation
    saturnMesh.position.y = Math.cos(t*0.0016) / 25;
    saturnMesh.rotation.y = t/3500;
    //uranus Rotation
    uranusMesh.position.y = Math.cos(t*0.0015) / 25;
    uranusMesh.rotation.y = t/3500;
    //Neptune Rotation
    neptuneMesh.position.y = Math.cos(t*0.0013) / 25;
    neptuneMesh.rotation.y = t/3500;

    if(isMoving){
        
        camera.position.x += (targetCameraX - camera.position.x) * smoothSpeed;

        if (Math.abs(camera.position.x - targetCameraX) < 0.01) {
            isMoving = false; 
        }
    }

    renderer.render(scene, camera);
    controls.update();

}
animate();



////Functions
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const allObjectsInScene = [];
    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
            allObjectsInScene.push(object);
        }
    });

    const intersects = raycaster.intersectObjects(allObjectsInScene);

    
    let anyIntersected = false;

    for (const key in infoBoxes) {
        infoBoxes[key].classList.remove('ease-in');
        infoBoxes[key].classList.add('ease-out');
    }

    if (intersects.length > 0) {
        anyIntersected = true; 
        const objectName = intersects[0].object.name; 
        const infoBox = infoBoxes[objectName];
        if (infoBox) {
            infoBox.style.display = 'block';
            infoBox.classList.remove('ease-out');
            infoBox.classList.add('ease-in');
        }
    }
}

window.addEventListener('mousemove', onMouseMove);


function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothMoveTarget(newX) {
    const duration = 500; 
    const startTime = performance.now();
    const startX = controls.target.x;

    function animate() {
        const elapsed = performance.now() - startTime;
        const t = Math.min(elapsed / duration, 1); 

        // Apply the easing function
        const easedT = easeInOutCubic(t);

        camera.position.x += (targetCameraX - camera.position.x) * smoothSpeed;

        // Interpolate with easing
        const x = startX + (newX - startX) * easedT;

        // Update the target position
        controls.target.set(x, 0, 0);
        controls.update();

        if (t < 1) {
            requestAnimationFrame(animate); 
        }
    }

    animate();
}

export default function getStarfield({ numStars = 500 } = {}) {
    function randomSpherePoint() {
      const radius = Math.random() * 25 + 25;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      let x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta);
      let z = radius * Math.cos(phi);
  
      return {
        pos: new THREE.Vector3(x, y, z),
        hue: 0.6,
        minDist: radius,
      };
    }
    const verts = [];
    const colors = [];
    const positions = [];
    let col;
    for (let i = 0; i < numStars; i += 1) {
      let p = randomSpherePoint();
      const { pos, hue } = p;
      positions.push(p);
      col = new THREE.Color().setHSL(hue, 0.2, Math.random());
      verts.push(pos.x, pos.y, pos.z);
      colors.push(col.r, col.g, col.b);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      map: new THREE.TextureLoader().load(
        "./Textures/circle.png"
      ),
    });
    const points = new THREE.Points(geo, mat);
    return points;
  }