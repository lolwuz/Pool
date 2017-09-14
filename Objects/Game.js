
class Game{
    constructor(player1, player2){
        // Create a scene with objects.
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.camera.up.set( 0, 0, 1 );
        this.camera.position.set(0, 0, 40);
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer = new THREE.WebGLRenderer({antialias:true});

        this.renderer.setClearColor(0xCCCCFF, 1);
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.maxDistance = 100;
        this.controls.minDistance = 5;
        this.controls.enablePan = false;
        this.controls.enableRotate = true;
        this.controls.maxPolarAngle = 1.3;

        this.table = new Table();
        this.ballArray = [
            new Ball(0, {x: 0, y: -5}),
            new Ball(9, {x: 0, y: 5}),
            new Ball(12, {x: -0.51, y: 6}),
            new Ball(7, {x: 0.51, y: 6}),
            new Ball(1, {x: -1.01, y: 7}),
            new Ball(8, {x: 0, y: 7}),
            new Ball(15, {x: 1.01, y: 7}),
            new Ball(14, {x: -1.53, y: 8}),
            new Ball(3, {x: -0.51, y: 8}),
            new Ball(10, {x: 0.51, y: 8}),
            new Ball(6, {x: 1.53, y: 8}),
            new Ball(5, {x: -2.02, y: 9}),
            new Ball(4, {x: -1.01, y: 9}),
            new Ball(13, {x: 0, y: 9}),
            new Ball(2, {x: 1.01, y: 9}),
            new Ball(11, {x: 2.02, y: 9})
        ];

        this.players = [
            player1,
            player2
        ];

        for(let i = 0; i < this.ballArray.length; i++){
            this.scene.add(this.ballArray[i]);
        }

        // Light
        let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
        let lightBulb1 = new THREE.PointLight(0xFFFFFF, 0.5, 50);
        let lightBulb2 = new THREE.PointLight(0xFFFFFF, 0.5, 50);

        this.scene.add(ambientLight);
        this.scene.add(lightBulb1);
        this.scene.add(lightBulb2);

        lightBulb1.position.set( 0, 5, 8 );
        lightBulb2.position.set( 0, -5, 8 );

        this.ballArray[0].speed.x = 0;
        this.ballArray[0].speed.y = 0.4;

        this.clock = new THREE.Clock();
    };


}

