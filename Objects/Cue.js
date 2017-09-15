class Cue extends THREE.Mesh{
    constructor(ball){
        let woodTexture = new THREE.TextureLoader().load("./3D/texture/cuewood.jpg");
        let geometry = new THREE.CylinderGeometry(0.1, 0.15, 12, 32, 32);
        let material = new THREE.MeshBasicMaterial( { map: woodTexture } );
        super(geometry, material);
        this.geometry.translate(0, -7, 0);
        this.position.set(ball.position.x, ball.position.y, 0);
        this.speed = 0.6;
        this.selectedBall = ball;
    };

    rotateDegrees(degrees) {
        this.rotateZ(degrees);
    };

    setBall(ball){
        this.selectedBall = ball;
        this.position.set(ball.position.x, ball.position.y, 0);
    };

    shoot(force){

        let angle = this.rotation.z - (-90 * Math.PI / 180);
        let speedX = Math.cos(angle) * force;
        let speedY = Math.sin(angle) * force;
        this.selectedBall.setSpeed({x: speedX, y: speedY});
    };
}