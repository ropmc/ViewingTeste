import * as THREE from 'three';

import Sizes from './Sizes.js';
import Time from "./Time.js"; 
import Resources from './Resources.js'
import assets from './Assets.js'

import Camera from './Camera.js';
import Renderer from "./Renderer.js";

import World from "../World/World.js";

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
       this.canvas = canvas;
       this.scene = new THREE.Scene();
       this.sizes = new Sizes();
       this.time = new Time();
       this.camera = new Camera();
       this.renderer = new Renderer();
       this.resources = new Resources(assets);
       this.world = new World ();
       
       this.sizes.on('resize', ()=> {
        this.resize();
       });
       
       this.time.on('update', ()=> {
        this.update();
       });

    }

    resize() {
        this.camera.resize();
        this.renderer.resize();

    }

    update() {
        this.camera.update();
        this.renderer.update();

    }

}