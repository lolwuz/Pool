/**
 * Created by martenhoekstra on 05/09/2017.
 */

class Ball extends THREE.Mesh{
    constructor(color, position) {
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: color });
        super(sphereGeometry, material);
        this.speed = {
            x: 0,
            y: 0
        }

        this.position.set(position.x, position.y, 0);
        this.isColliding = false;
    }

    checkCollision(Ball){
        // Calculating distance between Balls.
        let dx = Ball.position.x - this.position.x;
        let dy = Ball.position.y - this.position.y;
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        
        if(distance <= 1){ // Collision!
            console.log("Collsion");
            this.isColliding = true;
            let movementAngleA = Math.atan2(this.speed.y, this.speed.x);
            let movementAngleB = Math.atan2(Ball.speed.y, Ball.speed.x);
            let velocityA = Math.sqrt(Math.pow(this.speed.y, 2) + Math.pow(this.speed.x, 2));
            let velocityB = Math.sqrt(Math.pow(Ball.speed.y, 2) + Math.pow(Ball.speed.x, 2));

            let collisionAngle = Math.atan2(dy, dx);

            this.speed.x = ((velocityA * Math.cos(movementAngleA - collisionAngle) + 2 * velocityB * Math.cos(movementAngleB - collisionAngle)) / 2)
                * Math.cos(collisionAngle) + velocityA * Math.sin(movementAngleA - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2 );

            this.speed.y = ((velocityA * Math.cos(movementAngleA - collisionAngle) + 2 * velocityB * Math.cos(movementAngleB - collisionAngle)) / 2)
                * Math.sin(collisionAngle) + velocityA * Math.sin(movementAngleA - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2 );      
        }
    }

    move(deltaTime){
        this.position.set( this.position.x + this.speed.x * deltaTime, this.position.y + this.speed.y * deltaTime, 0 );
    }
}
