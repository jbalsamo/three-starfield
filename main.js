import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";

let container, stats;

let gui, controls, camera, scene, renderer;

let points;

init();
animate();

function init() {
  container = document.getElementById("container");

  //

  camera = new THREE.PerspectiveCamera(
    27,
    window.innerWidth / window.innerHeight,
    5,
    3500
  );
  camera.position.z = 8200;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);
  //scene.fog = new THREE.Fog(0x050505, 2000, 3500);

  //
  const particles = 7000000;

  const geometry = new THREE.BufferGeometry();

  const positions = [];
  const colors = [];

  const color = new THREE.Color();

  const n = 10000,
    n2 = n / 2; // particles spread in the cube

  for (let i = 0; i < particles; i++) {
    // positions

    const x = Math.random() * n - n2;
    const y = Math.random() * n - n2;
    const z = Math.random() * n - n2;

    positions.push(x, y, z);

    // colors

    color.setRGB(1, 1, 1, THREE.SRGBColorSpace);

    colors.push(color.r, color.g, color.b);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  geometry.computeBoundingSphere();

  //

  const material = new THREE.PointsMaterial({ size: 15, vertexColors: true });

  points = new THREE.Points(geometry, material);
  scene.add(points);

  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  //

  stats = new Stats();
  container.appendChild(stats.dom);

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {
  const time = Date.now() * 0.001;
  renderer.render(scene, camera);
}
