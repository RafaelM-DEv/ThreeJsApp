import './style.css'

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio )

renderer.setSize( window.innerWidth, window.innerHeight )

camera.position.setZ(30)

renderer.render( scene, camera )

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

const material = new THREE.MeshStandardMaterial({ color: 0xff6347 })

const torus = new THREE.Mesh( geometry, material )

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

// scene.add(torus)

const loader = new GLTFLoader()

class Ship {
  constructor () {
    loader.load('assets/spaceship/scene.gltf', ( gltf ) => {
      scene.add( gltf.scene )
      gltf.scene.scale.set(20, 20, 20)
      this.ship = gltf.scene
    })
  }
  rotation() {
    this.ship.rotation.y += 0.01
  }
}
let ship = new Ship()


const spaceTexture = new THREE.TextureLoader().load('assets/back.jpg')
scene.background = spaceTexture

function animate () {
  requestAnimationFrame ( animate )

  torus.rotation.x += 0.01
  torus.rotation.y += 0.001
  torus.rotation.z += 0.01

  controls.update()
  camera.position.x = 15
  camera.position.y = 5
  camera.position.z = 10

  ship.rotation()

  renderer.render( scene, camera )
}

animate()
