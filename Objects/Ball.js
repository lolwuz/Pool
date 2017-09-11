/**
 * Created by martenhoekstra on 05/09/2017.
 */

class Ball extends THREE.Mesh{
    constructor(ballnumber, position) {
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const texture = new THREE.TextureLoader().load( "./textures/ball/" + ballnumber + ".gif" );
        const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, map: texture, shininess: 70 });
        super(sphereGeometry, material);
        this.speed = {
            x: 0,
            y: 0
        };
        this.position.set(position.x, position.y, 0);
    };

    setSpeed(speed){
        this.speed = speed; 
    };

    setPosition(position){
        this.position = position;
    };

    checkCollision(Ball){
        // Calculating distance between Balls.
        let dx = Ball.position.x - this.position.x;
        let dy = Ball.position.y - this.position.y;
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));


        if(distance < 1){ // Collision!
            let movementAngleA = Math.atan2(this.speed.y, this.speed.x);
            let movementAngleB = Math.atan2(Ball.speed.y, Ball.speed.x);
            let velocityA = Math.sqrt(Math.pow(this.speed.y, 2) + Math.pow(this.speed.x, 2));
            let velocityB = Math.sqrt(Math.pow(Ball.speed.y, 2) + Math.pow(Ball.speed.x, 2));
            let collisionAngle = Math.atan2(dy, dx);

            let aSpeedX = (2 * velocityB * Math.cos(movementAngleB - collisionAngle) / 2)
                * Math.cos(collisionAngle) + velocityA * Math.sin(movementAngleA - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2 );
            let aSpeedY = (2 * velocityB * Math.cos(movementAngleB - collisionAngle) / 2)
                * Math.sin(collisionAngle) + velocityA * Math.sin(movementAngleA - collisionAngle) * Math.sin(collisionAngle + Math.PI / 2 );    
                
            let bSpeedX = (2 * velocityA * Math.cos(movementAngleA - collisionAngle) / 2)
                * Math.cos(collisionAngle) + velocityB * Math.sin(movementAngleB - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2 );
            let bSpeedY = (2 * velocityA * Math.cos(movementAngleA - collisionAngle) / 2)
                * Math.sin(collisionAngle) + velocityB * Math.sin(movementAngleB - collisionAngle) * Math.sin(collisionAngle + Math.PI / 2 );


            console.log((Math.round(Math.cos(collisionAngle) * 1000) / 1000));
            // Reset position outside of collision bounds.
            this.position.x = Ball.position.x - (Math.round(Math.cos(collisionAngle) * 1000) / 1000);
            this.position.y = Ball.position.y - (Math.round(Math.sin(collisionAngle) * 1000) / 1000);


            this.setSpeed({x: aSpeedX, y: aSpeedY});
            Ball.setSpeed({x: bSpeedX, y: bSpeedY});

        }
    };

    move(deltaTime){
        // Set new position according to x/y speed.
        this.position.set( this.position.x + this.speed.x * deltaTime, this.position.y + this.speed.y * deltaTime, 0 );

        // Handle rotation

        let axis = new THREE.Vector3(),
            quaternion = new THREE.Quaternion();

        let angle = Math.acos();

        if (angle)
        {
            axis.crossVectors(rotateStart, rotateEnd).normalize();
            angle *= rotationSpeed;
            quaternion.setFromAxisAngle(axis, angle);
        }
        return quaternion;


        let rotateEndPoint = projectOnTrackball(deltaX, deltaY);

        let rotateQuaternion = rotateMatrix(rotateStartPoint, rotateEndPoint);
        let curQuaternion = this.quaternion;

        curQuaternion.multiplyQuaternions(rotateQuaternion, curQuaternion);
        curQuaternion.normalize();

        this.setRotationFromQuaternion(curQuaternion);

        rotateEndPoint = rotateStartPoint;
    };
}
