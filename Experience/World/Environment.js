import { PerspectiveCamera } from 'three';
import * as THREE from 'three';
import Experience from '../Utils/Experience.js';


export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
        this.setSunlight2();
        //this.setCornerLight();
        //this.setSunlight4();
        //this.createLightingRoom1();
        //this.createLightingRoom2();
        //this.createLightingRoom3();
        //this.createPilarLighting();
    }
 
    setSunlight(){
      //this.sunLight = new THREE.DirectionalLight('#ffffff', 0.08, 3.8 , 0.00001 );
      this.sunLight = new THREE.PointLight('#ffffff', 1, 12, 0.64);
      this.sunLight.position.set(0, 0 , 0.3);
      this.scene.add(this.sunLight);
    }

    setSunlight2(){
      this.sunLight = new THREE.PointLight('#ffffff', 1, 11.5, 0.64);
      this.sunLight.position.set(0, 0, -40.771);
      this.scene.add(this.sunLight);
    }

    setCornerLight(){
      this.sunLight = new THREE.SpotLight('#ffffff', 1, 0 );
      this.sunLight.position.set(6, 0, -32);
      this.sunLight.angle = Math.PI/32
      this.sunLight.target.position.set(7, 10, -35);
      this.scene.add(this.sunLight);
      this.scene.add(this.sunLight.target);
    }

    setSunlight4(){
      this.sunLight = new THREE.PointLight('#ffffff', 0.02, 0 );
      this.sunLight.position.set(0.406969279050827, 2.791776657104492, -22.5208740234375);
      this.scene.add(this.sunLight);
    }

    createLightingRoom1() {
        const spotLightIntensity = 1;

        //LIGHT 1

        this.light1 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light1.position.set(3.717153310775757 , 3.711759567260742 , 3.7378127574920654);
        this.light1.target.position.set(3.721141815185547, 1.546803593635559, 6.991433620452881);
        this.light1.penumbra= 0.5
        this.light1.castShadow = false;
        this.scene.add(this.light1.target);
        this.scene.add(this.light1);

        //LIGHT 2

        this.light2 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light2.position.set(-0.18950143456459045 , 3.7277097702026367 , 3.709681987762451);
        this.light2.target.position.set(-0.26444488763809204, 1.5573041439056396, 6.672125339508057);
        this.light2.penumbra= 0.5
        this.light2.castShadow = false;
        this.scene.add(this.light2.target);
        this.scene.add(this.light2);

        //LIGHT 3

        this.light3 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light3.position.set(-4.0944294929504395 , 3.6904897689819336 , 3.7472472190856934);
        this.light3.target.position.set(-4.256809711456299, 1.5415486097335815, 7.610476493835449);
        this.light3.penumbra= 0.5
        this.light3.castShadow = false;
        this.scene.add(this.light3.target);
        this.scene.add(this.light3);

        //LIGHT 4

        this.light4 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light4.position.set(-5.415908336639404 , 0.000029921531677246094 , 3.34604549407959);
        this.light4.target.position.set(-7.87091064453125, 1.5328407287597656, 3.378114700317383);
        this.light4.penumbra= 0.5
        this.light4.castShadow = false;
        this.scene.add(this.light4.target);
        this.scene.add(this.light4);

        //LIGHT 5

        this.light5 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light5.position.set(-5.469705104827881 , 0.000041604042053222656 , -0.6348373889923096);
        this.light5.target.position.set(-8.03080940246582, 1.540982961654663, -0.6299369931221008);
        this.light5.penumbra= 0.5
        this.light5.castShadow = false;
        this.scene.add(this.light5.target);
        this.scene.add(this.light5);
        
        //LIGHT 6

        this.light6 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light6.position.set(-5.439052581787109 , -0.00002491474151611328 , -4.647208213806152);
        this.light6.target.position.set(-7.585906505584717, 1.5451552867889404, -4.61508846282959);
        this.light6.penumbra= 0.5
        this.light6.castShadow = false;
        this.scene.add(this.light6.target);
        this.scene.add(this.light6);

        //LIGHT 7

        this.light7 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light7.position.set(-4.1610612869262695 , 3.684641122817993 , -3.758317470550537);
        this.light7.target.position.set(-4.281622409820557, 1.548529863357544, -7.1746931076049805);
        this.light7.penumbra= 0.5
        this.light7.castShadow = false;
        this.scene.add(this.light7.target);
        this.scene.add(this.light7);

        //LIGHT 8

        this.light8 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light8.position.set(-0.30328747630119324 , 3.668034553527832 , -3.755100727081299);
        this.light8.target.position.set(-0.26498568058013916, 1.5507762432098389, -6.509815692901611);
        this.light8.penumbra= 0.5
        this.light8.castShadow = false;
        this.scene.add(this.light8.target);
        this.scene.add(this.light8);

        //LIGHT 9

        this.light9 = new THREE.SpotLight(0xffffff, spotLightIntensity, 10, Math.PI/7);
        this.light9.position.set(3.8150064945220947 , 3.667668581008911 , -3.777590751647949);
        this.light9.target.position.set(3.7263619899749756, 1.5546238422393799, -7.006832599639893);
        this.light9.penumbra= 0.5
        this.light9.castShadow = false;
        this.scene.add(this.light9.target);
        this.scene.add(this.light9);

      }



    resize() {
    }

    update(){
    }
}