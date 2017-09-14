class Cue extends THREE.Mesh{
    constructor(){
        let woodTexture = new THREE.ImageUtils.loadTexture("./3D/texture/cuewood.jpg");
        let geometry = new THREE.CylinderGeometry(0.1, 0.15, 12, 32, 32);
        let material = new THREE.MeshBasicMaterial( { map: woodTexture } );
        super(geometry, material);
    };

    update(Ball) {

    };

    shoot(speed){

    };
}