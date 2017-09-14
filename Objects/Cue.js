class Cue extends THREE.Mesh{
    constructor(position){
        let woodTexture = new THREE.TextureLoader().load("./3D/texture/cuewood.jpg");
        let geometry = new THREE.CylinderGeometry(0.1, 0.15, 12, 32, 32);
        let material = new THREE.MeshBasicMaterial( { map: woodTexture } );
        super(geometry, material);
        console.log(position);
        this.geometry.translate(0, -7, 0);
        this.position.set(position.x, position.y, 0);
        this.speed = 0.6;
        this.center = position;
    };

    rotateDegrees(degrees) {
        this.rotateZ(degrees);
    };

    shoot(Ball){

    };
}