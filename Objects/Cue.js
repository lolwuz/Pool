class Cue extends THREE.Mesh{
    constructor(ball){
        let woodTexture = new THREE.TextureLoader().load("./3D/texture/cuewood.jpg");
        let geometry = new THREE.CylinderGeometry(0.1, 0.15, 12, 32, 32);
        let material = new THREE.MeshBasicMaterial( { map: woodTexture } );
        super(geometry, material);
        this.geometry.translate(0, -7, 0);
        this.castShadow = true;
        this.position.set(ball.position.x, ball.position.y, 0);
        this.speed = 0.6;
        this.selectedBall = ball;
    };

    rotateDegrees(degrees) {
        this.rotateZ(degrees);
    };

    setBall(ball){
        this.selectedBall = ball;
        this.position.set(ball.position.x, ball.position.y, ball.position.z);
    };

    shoot(force){
        let angle = this.rotation.z - (-90 * Math.PI / 180);
        let speedX = Math.cos(angle) * force;
        let speedY = Math.sin(angle) * force;
        this.selectedBall.setSpeed({x: speedX, y: speedY});

        // temp hide cue
        this.traverse ( function (child) {
            if (child instanceof THREE.Mesh) {
                child.visible = false;
            }
        });
    };

    update(camera){
        let dx = this.selectedBall.position.x - camera.position.x;
        let dy = this.selectedBall.position.y - camera.position.y;

        let cameraAngle = Math.atan2(dy, dx);
        this.rotation.z = cameraAngle + (-90 * Math.PI / 180);

        // Set camera to rotate and look at selected ball
        camera.lookAt(this.selectedBall.position);
        // camera.position.set(this.selectedBall.position.x, this.selectedBall.position.y, 40);

        this.position.set(this.selectedBall.position.x, this.selectedBall.position.y, this.selectedBall.position.z);

        // show cue of speed > ?
        if (Math.abs(this.selectedBall.speed.y) <= 0.005 && Math.abs(this.selectedBall.speed.x) <= 0.005) {
            this.traverse ( function (child) {
                if (child instanceof THREE.Mesh) {
                    child.visible = true;
                }
            });
        }
    };
}