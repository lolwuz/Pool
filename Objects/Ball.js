/**
 * Created by martenhoekstra on 05/09/2017.
 */

class Ball extends THREE.Mesh{
    constructor(ballNumber, position) {
        const sphereGeometry = new THREE.SphereGeometry(0.5, 128, 128);
        const texture = new THREE.TextureLoader().load( "./textures/ball/" + ballNumber + ".png" );
        const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, map: texture, shininess: 20, specular: 0xFFFFFF });
        super(sphereGeometry, material);
        this.speed = new THREE.Vector2();
        this.position.set(position.x, position.y, 0);
    };

    setSpeed(speed){
        this.speed = speed; 
    };

    setPosition(position){
        this.position = position;
    };

    checkCollisionBall(Ball){
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


            // Reset position outside of collision bounds.
            this.position.x = Ball.position.x - (Math.round(Math.cos(collisionAngle) * 1000) / 1000);
            this.position.y = Ball.position.y - (Math.round(Math.sin(collisionAngle) * 1000) / 1000);


            this.setSpeed({x: aSpeedX, y: aSpeedY});
            Ball.setSpeed({x: bSpeedX, y: bSpeedY});
        }
    };

    checkCollisionTable(Table){
        // Reverse speed when boundary off the table have been reached.
        if(this.position.y + 0.5 > Table.dimensions.topLeft.y || this.position.y + 0.5 < Table.dimensions.bottomLeft.y){
            this.speed.y *= -1; // Vertical
        }
        if(this.position.x + 0.5 > Table.dimensions.topRight.x || this.position.x + 0.5 < Table.dimensions.topLeft.x){
            this.speed.x *= -1; // Horizontal
        }
    };

    move(deltaTime){
        // Setting rolling resistance.
        this.speed.x = this.speed.x * (1 - 0.02 * deltaTime);
        this.speed.y = this.speed.y * (1 - 0.02 * deltaTime);
        
        /*
        // If speed is to low the ball stops rolling. 
        let speed = Math.atan2(this.speed.y, this.speed.x);
        console.log();
        if(Math.atan2(this.speed.y, this.speed.x) < 0.02){
            this.speed = new THREE.Vector2();
        }   
        */
    
        // Set new position according to x/y speed.
        let stepX = this.speed.x * deltaTime;
        let stepY = this.speed.y * deltaTime;
        this.position.set( this.position.x + this.speed.x * deltaTime, this.position.y + this.speed.y * deltaTime, 0 );

        // Update ball rotation
        let tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(0,1,0), stepX/ 0.5);
        tempMat.multiply(this.matrix);
        this.matrix = tempMat;
        tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(1,0,0), -stepY/0.5);
        tempMat.multiply(this.matrix);
        this.matrix = tempMat;
        this.rotation.setFromRotationMatrix(this.matrix);
    };
}
