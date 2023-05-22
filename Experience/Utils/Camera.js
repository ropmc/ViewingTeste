import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { Raycaster } from 'three'; //NOVIDADE

export default class Camera {
  constructor() {
    this.prevTime = performance.now();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.speed = 0;
    blocker2.style.display='none';
    

    this.canvas = this.experience.canvas;
    this.moveForward = false;
	  this.moveBackward = false;
	  this.moveLeft = false;
	  this.moveRight = false;
    
    const RaycasterThreshold = 0.3;
    this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, RaycasterThreshold );  //NOVIDADE
    this.raycasterBackwards = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, RaycasterThreshold );  //NOVIDADE
    this.raycasterLeft = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, RaycasterThreshold );  //NOVIDADE
    this.raycasterRight = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, RaycasterThreshold );  //NOVIDADE
    //this.raycasterLeft = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, RaycasterThreshold );  //NOVIDADE



    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setPointerLockControls();
    this.createColliderGeometry();

    const listener = new THREE.AudioListener();
    this.perspectiveCamera.add( listener );
    this.sound = new THREE.PositionalAudio( listener );

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('/music/or2.wav', ( buffer ) => {
      this.sound.setBuffer( buffer );
      this.sound.setRefDistance( 5 );
      this.sound.setLoop(true);
      //sound.play();
    });

    const sphere = new THREE.SphereGeometry( 0.1, 1, 1 );
    const materiall = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
    const mesh = new THREE.Mesh( sphere, materiall );
    mesh.position.set(0, 5, -25);
    this.scene.add( mesh );
    mesh.add( this.sound );
  }

  createColliderGeometry() {
    const colliderGeometry = new THREE.BoxGeometry(1, 1, 1);
    const colliderMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false });
    this.colliderMesh = new THREE.Mesh(colliderGeometry, colliderMaterial);
    this.scene.add(this.colliderMesh);
  }
  
  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000);
    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.set(0, 1.5, -45);
    this.perspectiveCamera.lookAt(0, 6, -2.5 );

    this.controls = new PointerLockControls(this.perspectiveCamera, this.canvas);
    this.scene.add(this.controls.getObject());
  }


  createOrthographicCamera() {
    const frustrumSize = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(-this.sizes.width / frustrumSize, this.sizes.width / frustrumSize, this.sizes.height / frustrumSize, -this.sizes.height / frustrumSize, -100, 100);
    this.scene.add(this.orthographicCamera);

    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    //this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    //this.scene.add(axesHelper);
  }

  setPointerLockControls() {
    
    this.controls = new PointerLockControls(this.perspectiveCamera, this.canvas);
    const instructions = document.getElementById( 'instructions' );
    

    // Add event listeners to enable and disable the pointer lock
    this.canvas.addEventListener('click', () => {
      this.controls.lock();
    });
  
    this.controls.addEventListener('unlock', () => {
      this.controls.enabled = true;
      this.controls.velocity = 1000; //1000000000
      instructions.style.display = '';
      blocker.style.display = 'block';
      instructions2.style.display='none';
      blocker2.style.display='none';
      this.speed = 0;
      this.sound.pause()
    });

    this.controls.addEventListener('lock', () => {
      this.controls.enabled = false;
      this.speed = 0.02; //0.02
      instructions.style.display = 'none';
      blocker.style.display = 'none';
      instructions2.style.display = '';
      blocker2.style.display = 'block';
      this.sound.play()
    });


    const onKeyDown = (event) => {
        switch (event.code) {
          case 'ArrowUp':
          case 'KeyW':
            this.moveForward = true;
            break;
          case 'ArrowLeft':
          case 'KeyA':
            this.moveLeft = true;
            break;
          case 'ArrowDown':
          case 'KeyS':
            this.moveBackward = true;
            break;
          case 'ArrowRight':
          case 'KeyD':
            this.moveRight = true;
            break;
        }
      };
      
      const onKeyUp = (event) => {
        switch (event.code) {
          case 'ArrowUp':
          case 'KeyW':
            this.moveForward = false;
            break;
          case 'ArrowLeft':
          case 'KeyA':
            this.moveLeft = false;
            break;
          case 'ArrowDown':
          case 'KeyS':
            this.moveBackward = false;
            break;
          case 'ArrowRight':
          case 'KeyD':
            this.moveRight = false;
            break;
        }
      };

      const onTouchStart = (event) => {
        //event.preventDefault();

        // Get the touch position relative to the canvas
        if (!this.controls.isLocked) {
          document.querySelector('#experience').click()
          this.controls.enabled = true;
          instructions.style.display = 'none';
          blocker.style.display = 'none';
          instructions2.style.display = '';
          blocker2.style.display = 'block';
          this.speed = 0.02;
          this.sound.play();
        }


       // }
        
        const touch = event.touches[0];
        const x = touch.clientX / window.innerWidth * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
    
        // Determine which direction to move based on touch position
        this.moveForward = y > 0;
        this.moveBackward = y < 0;
        this.moveLeft = x < 0;
        this.moveRight = x > 0;
      };
    
      const onTouchEnd = () => {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
      };
    
      const onTouchMove = (event) => {
        //event.preventDefault();

        // Get the touch position relative to the canvas
        const touch = event.touches[0];
        const x = touch.clientX / window.innerWidth * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
    
        // Determine which direction to move based on touch position
        this.moveForward = y > 0;
        this.moveBackward = y < 0;
        this.moveLeft = x < 0;
        this.moveRight = x > 0;
      };

      const handleDeviceOrientation = (event) => {
        //if (!controls.isLocked) return;
      
        const alpha = event.alpha; // Z-axis rotation (in degrees)
        const beta = event.beta;   // X-axis rotation (in degrees)
        const gamma = event.gamma; // Y-axis rotation (in degrees)
      
        // Adjust the rotation values to match the camera's orientation
        const euler = new THREE.Euler(
          THREE.MathUtils.degToRad(beta),
          THREE.MathUtils.degToRad(alpha),
          -THREE.MathUtils.degToRad(gamma),
          'YXZ'
        );
      
        // Apply the rotation to the camera
          console.log("Teste");
      }
      
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('keyup', onKeyUp);
      document.addEventListener('touchstart', onTouchStart, { passive: false });
      document.addEventListener('touchend', onTouchEnd, { passive: false });
      document.addEventListener('touchmove', onTouchMove, { passive: false });
      document.addEventListener('deviceorientation', handleDeviceOrientation, true);
      
  } 

  resize() {
    // Updating Perspective Camera on resize
    this.perspectiveCamera.aspect = this.sizes.width / this.sizes.height;
    this.perspectiveCamera.updateProjectionMatrix();

    this.resources.video['tela1']

    // Updating Orthographic Camera on resize
    const frustrumSize = 5;
    this.orthographicCamera.left = -this.sizes.width / frustrumSize;
    this.orthographicCamera.right = this.sizes.width / frustrumSize;
    this.orthographicCamera.top = this.sizes.height / frustrumSize;
    this.orthographicCamera.bottom = -this.sizes.height / frustrumSize;
    this.orthographicCamera.updateProjectionMatrix();
  }

  

  update() {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    this.colliderMesh.position.set(this.perspectiveCamera.position.x, 0.1, this.perspectiveCamera.position.z); //NOVIDADE 
    this.colliderMesh.rotation.copy(this.perspectiveCamera.rotation); //NOVIDADE


    //this.controls.enabled = true;


    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room;
    const time = performance.now();
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const speed = 0.02;
    const delta = ( time - this.prevTime) / 1000;
    
    //SETANDO COLISÕES 
    const collisiondirection = new THREE.Vector3(this.perspectiveCamera.getWorldDirection(direction).x, 0.1, this.perspectiveCamera.getWorldDirection(direction).z);
    this.raycaster.set(this.colliderMesh.position, collisiondirection); //NOVIDADE this.perspectiveCamera.getWorldDirection(direction)
    const intersects = this.raycaster.intersectObjects(this.scene.children); //NOVIDADE

    const collisiondirectionBackwards = new THREE.Vector3((this.perspectiveCamera.getWorldDirection(direction).x), 0.1, this.perspectiveCamera.getWorldDirection(direction).z);
    const rotationMatrixBackwards = new THREE.Matrix4().makeRotationY((Math.PI));
    collisiondirectionBackwards.applyMatrix4(rotationMatrixBackwards);
    this.raycasterBackwards.set(this.colliderMesh.position, collisiondirectionBackwards); //NOVIDADE this.perspectiveCamera.getWorldDirection(direction)
    const intersectsBackwards = this.raycasterBackwards.intersectObjects(this.scene.children); //NOVIDADE

    const collisiondirectionLeft = new THREE.Vector3((this.perspectiveCamera.getWorldDirection(direction).x), 0.1, (this.perspectiveCamera.getWorldDirection(direction).z));
    const rotationMatrix = new THREE.Matrix4().makeRotationY((Math.PI/2));
    collisiondirectionLeft.applyMatrix4(rotationMatrix);
    this.raycasterLeft.set(this.colliderMesh.position, collisiondirectionLeft); //NOVIDADE this.perspectiveCamera.getWorldDirection(direction)
    const intersectsLeft = this.raycasterLeft.intersectObjects(this.scene.children); //NOVIDADE

    const collisiondirectionRight = new THREE.Vector3((this.perspectiveCamera.getWorldDirection(direction).x), 0.1, (this.perspectiveCamera.getWorldDirection(direction).z));
    const rotationMatrix2 = new THREE.Matrix4().makeRotationY((Math.PI*(3/2)));
    collisiondirectionRight.applyMatrix4(rotationMatrix2);
    this.raycasterRight.set(this.colliderMesh.position, collisiondirectionRight); //NOVIDADE this.perspectiveCamera.getWorldDirection(direction)
    const intersectsRight = this.raycasterRight.intersectObjects(this.scene.children); //NOVIDADE

    // FIM SETANDO COLISÕES
    
    //DEBUGANDO COLISÕES
   // if (intersects.length > 0) {
     // console.log('Collision forward detected!');
    //}

    //if (intersectsBackwards.length > 0) {
     // console.log('Collision backward detected!');
   // }

    //if (intersectsLeft.length > 0) {
    //  console.log('Collision left detected!');
   // }

    //if (intersectsRight.length > 0) {
     // console.log('Collision right detected!');
    //}



    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; 

    direction.z = Number( this.moveForward ) - Number( this.moveBackward );
    direction.x = Number( this.moveRight ) - Number( this.moveLeft );


    
    if ( this.moveForward || this.moveBackward ) velocity.z -= direction.z * this.speed;
    if ( this.moveLeft || this.moveRight ) velocity.x -= direction.x * this.speed;

    this.controls.moveRight( - velocity.x );
    this.controls.moveForward( - velocity.z );
    
    //PARANDO CONTROLES NAS COLISÕES
    if (intersects.length > 0) {
      this.controls.moveForward(-0.02);
    }
    
    if (intersectsBackwards.length > 0) {
      this.controls.moveForward(0.02);
    }

    if (intersectsLeft.length > 0) {
      this.controls.moveRight(0.02);
    }
    
    if (intersectsRight.length > 0) {
      this.controls.moveRight(-0.02);
    }
    //FIM PARANDO CONTROLES NAS COLISÕES

    velocity.set(0, 0, 0);

  }
}  