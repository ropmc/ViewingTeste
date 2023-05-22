import { PerspectiveCamera } from 'three';
import * as THREE from 'three'
import Experience from '../Utils/Experience.js'

export default class Room {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        //console.log(this.actualRoom.children);

        this.setModel();
        this.setAnimation();
    }
 
    setModel(){
        this.actualRoom.children.forEach(child=>{
            child.castShadow=true;
            child.receiveShadow=true;

            if (child instanceof THREE.Group){
                child.children.forEach((groupchild)=>{
                    groupchild.castShadow = true;
                    groupchild.receiveShadow= true;
                });
            }

            if (child.name === "Tela1"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tela1,
                });
            }

            if (child.name === "Tela2"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tela2,
                });
            }
            
            if (child.name === "Tela3"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tela3,
                });
            }

            if (child.name === "Tela4"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tela4,
                });
            }

            if (child.name === "Tela21"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tela5,
                });
            }

            if (child.name === "Tela22"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tela6,
                });
            }

            if (child.name === "Tela23"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tela7,
                });
            }

            if (child.name === "Tela24"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tela8,
                });
            }
        })
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(1, 1, 1);
        //this.actualRoom.rotation.y = Math.PI;
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        //console.log(this.room);
    }

    resize() {
    }

    update(){
    }
}