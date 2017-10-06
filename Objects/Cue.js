class Cue extends THREE.Mesh {
    constructor(ball) {
        // let woodTexture = new THREE.TextureLoader().load("./3D/texture/cuewood.jpg");
        let geometry = new THREE.CylinderGeometry(0.1, 0.15, 12, 32, 32);
        let material = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF
        });
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

    setBall(ball) {
        this.selectedBall = ball;
        this.position.set(ball.position.x, ball.position.y, ball.position.z);
    };

    shoot(force) {
        // can't shoot while cue is invisible
        if (this.visible) {
            let angle = this.rotation.z - (-90 * Math.PI / 180);
            let speedX = Math.cos(angle) * force;
            let speedY = Math.sin(angle) * force;
            this.selectedBall.setSpeed({
                x: speedX,
                y: speedY
            });
        }

        // temp hide cue
        this.visible = false;
    };

    update(control) {
        let dx = this.selectedBall.position.x - control.object.position.x;
        let dy = this.selectedBall.position.y - control.object.position.y;

        let cameraAngle = Math.atan2(dy, dx);
        this.rotation.z = cameraAngle + (-90 * Math.PI / 180);

        // Set camera to rotate and look at selected ball
        this.position.set(this.selectedBall.position.x, this.selectedBall.position.y, this.selectedBall.position.z);

        // show cue again when speed of ball is < ...
        if (Math.abs(this.selectedBall.speed.y) <= 0.002 && Math.abs(this.selectedBall.speed.x) <= 0.002) {
            if(!this.visible){
                control.target = this.selectedBall.position;
                control.update();  
            }
            this.visible = true;
        }
    };
}
