/**
 * Created by martenhoekstra on 05/09/2017.
 */

class Ball extends THREE.Mesh{
    constructor(color, position) {
        const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
        super(sphereGeometry, material);
        this.speedVector = {
            x: 0,
            y: 0
        };
        this.positionVector = position;
    }
    checkCollision(){
        
    }
    move(){

    }

}