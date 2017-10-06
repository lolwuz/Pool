/**
 * Created by martenhoekstra on 05/09/2017.
 */

class Ball extends THREE.Mesh {
    constructor(ballNumber, position) {
        const sphereGeometry = new THREE.SphereGeometry(0.5, 128, 128);
        const texture = new THREE.TextureLoader().load("./textures/ball/" + ballNumber + ".png");
        const material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 0.25,
            metalness: 0,
            map: texture
        });
        super(sphereGeometry, material);
        this.ballNumber = ballNumber;

        this.castShadow = true;
        this.speed = new THREE.Vector2();
        this.position.set(position.x, position.y, 0);
        this.raycaster = new THREE.Raycaster();
        this.pocketed = false; // boolean for if the ball is pocketed (needed? hmm, not sure)
    };

    setSpeed(speed) {
        this.speed = speed;
    };

    setPosition(position) {
        this.position = position;
    };

    checkCollisionBall(Ball, sound) {
        // Calculating distance between Balls.
        let dx = Ball.position.x - this.position.x;
        let dy = Ball.position.y - this.position.y;
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        if (distance < 1) { // Collision!
            // Play sound
            //sound.play();
            let movementAngleA = Math.atan2(this.speed.y, this.speed.x);
            let movementAngleB = Math.atan2(Ball.speed.y, Ball.speed.x);
            let velocityA = Math.sqrt(Math.pow(this.speed.y, 2) + Math.pow(this.speed.x, 2));
            let velocityB = Math.sqrt(Math.pow(Ball.speed.y, 2) + Math.pow(Ball.speed.x, 2));
            let collisionAngle = Math.atan2(dy, dx);

            let aSpeedX = (2 * velocityB * Math.cos(movementAngleB - collisionAngle) / 2) *
                Math.cos(collisionAngle) + velocityA * Math.sin(movementAngleA - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2);
            let aSpeedY = (2 * velocityB * Math.cos(movementAngleB - collisionAngle) / 2) *
                Math.sin(collisionAngle) + velocityA * Math.sin(movementAngleA - collisionAngle) * Math.sin(collisionAngle + Math.PI / 2);

            let bSpeedX = (2 * velocityA * Math.cos(movementAngleA - collisionAngle) / 2) *
                Math.cos(collisionAngle) + velocityB * Math.sin(movementAngleB - collisionAngle) * Math.cos(collisionAngle + Math.PI / 2);
            let bSpeedY = (2 * velocityA * Math.cos(movementAngleA - collisionAngle) / 2) *
                Math.sin(collisionAngle) + velocityB * Math.sin(movementAngleB - collisionAngle) * Math.sin(collisionAngle + Math.PI / 2);

            // Reset position outside of collision bounds.
            this.position.x = Ball.position.x - (Math.round(Math.cos(collisionAngle) * 1000) / 1000);
            this.position.y = Ball.position.y - (Math.round(Math.sin(collisionAngle) * 1000) / 1000);

            this.setSpeed({
                x: aSpeedX,
                y: aSpeedY
            });
            Ball.setSpeed({
                x: bSpeedX,
                y: bSpeedY
            });
        }
    };

    checkCollisionTable(Table) {

        /*
        let direction = new THREE.Vector3(this.speed.x, this.speed.y, 0);
        this.raycaster.set(this.position, direction);

        let intersections = this.raycaster.intersectObjects(Table.children);

        for (let i = 0; i < intersections.length; i++) {
            let intersection = intersections[i];
            let dx = intersection.point.x - this.position.x;
            let dy = intersection.point.y - this.position.y;
            let distanceOfIntersect = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            if (distanceOfIntersect < 0.5) {
                console.log("hit");

                // Set new direction
                let newDirection = new THREE.Vector3(direction.x, direction.y, direction.z);
                newDirection.reflect(intersection.face.normal);

                this.speed.x = newDirection.x;
                this.speed.y = newDirection.y;
            }

            let antiNormal = new THREE.Vector3(intersection.face.normal.x, intersection.face.normal.y, intersection.face.normal.z);

            // Invert direction
            this.raycaster.set(this.position, antiNormal); // setting a new raycaster
            let lastIntersect = this.raycaster.intersectObjects(Table.children);

            let newPos = lastIntersect[0].point.add(antiNormal.multiplyScalar(-0.5));
            console.log(newPos);
            this.position.x = newPos.x;
            this.position.y = newPos.y;   
        }
        */

        if (!this.pocketed) {
            // Reverse speed when boundary off the table have been reached.
            if (this.position.x + 1 > Table.dimensions.topRight.x || this.position.x - 1 < Table.dimensions.topLeft.x) {
                this.speed.x *= -1;
            }
            if (this.position.y + 1 > Table.dimensions.topRight.y || this.position.y - 1 < Table.dimensions.bottomRight.y) {
                this.speed.y *= -1;
            }

            // Check hole collision
            // TopLeft Hole
            if (this.position.x - 1.4 < Table.dimensions.topLeft.x && this.position.y + 1.4 > Table.dimensions.topLeft.y) {
                this.pocket();
            }
            // TopRight Hole
            if (this.position.x + 1.4 > Table.dimensions.topRight.x && this.position.y + 1.4 > Table.dimensions.topRight.y) {
                this.pocket();
            }
            // BottomLeft Hole
            if (this.position.x - 1.4 < Table.dimensions.bottomLeft.x && this.position.y - 1.4 < Table.dimensions.bottomLeft.y) {
                this.pocket();
            }
            // BottomRight Hole
            if (this.position.x + 1.4 > Table.dimensions.bottomRight.x && this.position.y - 1.4 < Table.dimensions.bottomRight.y) {
                this.pocket();
            }
            // // MiddleLeft Hole
            if (this.position.x + - 1 < Table.dimensions.topLeft.x && (this.position.y < 1.2 && this.position.y > -1.2)) {
                this.pocket();
            }
            // MiddleRight Hole
            if (this.position.x + 1 > Table.dimensions.topRight.x && (this.position.y < 1.2 && this.position.y > -1.2)) {
                this.pocket();
            }
        }

    }

    move(deltaTime) {
        // Setting rolling resistance.
        this.speed.x = this.speed.x * (1 - 0.01 * deltaTime);
        this.speed.y = this.speed.y * (1 - 0.01 * deltaTime);

        // Set new position according to x/y speed.
        let stepX = this.speed.x * deltaTime;
        let stepY = this.speed.y * deltaTime;
        this.position.set(this.position.x + stepX, this.position.y + stepY, 0);

        // Update ball rotation
        let tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(0, 1, 0), stepX / 0.5);
        tempMat.multiply(this.matrix);
        this.matrix = tempMat;
        tempMat = new THREE.Matrix4();
        tempMat.makeRotationAxis(new THREE.Vector3(1, 0, 0), -stepY / 0.5);
        tempMat.multiply(this.matrix);
        this.matrix = tempMat;
        this.rotation.setFromRotationMatrix(this.matrix);
    }

    pocket() {
        console.log("ball pocketed");
        if (this.ballNumber !== 0) {
            this.visible = false;
            this.setSpeed({
                x: 0,
                y: 0
            });
            this.position.set(50, 50, 0);
            this.pocketed = true;
        }
    }
}
