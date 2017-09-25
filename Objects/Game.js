
class Game{
    constructor(player1, player2){
        // Create a scene with objects.
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

        this.camera.up.set( 0, 0, 1 );
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setClearColor(0xCCCCFF, 1);

        /* Cube mesh
        // Load cubeMap
        let path = "./3D/texture/Sides/";
        let format = ".png";
        let urls = [
            path + 'nx' + format, path + 'px' + format,
            path + 'pz' + format, path + 'nz' + format,
            path + 'py' + format, path + 'ny' + format
        ];
        let cubeMaterial = new THREE.CubeTextureLoader().load(urls);
        let shader = THREE.ShaderLib.cube;
        shader.uniforms.tCube.value = cubeMaterial;

        let material = new THREE.ShaderMaterial({
                fragmentShader: shader.fragmentShader,
                vertexShader: shader.vertexShader,
                uniforms: shader.uniforms,
                depthWrite: false,
                side: THREE.DoubleSide
        });

        this.cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), material);
        this.cubeMesh.scale.y = -1;
        this.scene.add(this.cubeMesh);
        */
        //

        let onProgress = function( xhr ) {

            if ( xhr.lengthComputable ) {

                let percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

            }

        };

        let onError = function( xhr ) {
            console.error( xhr );

        };
        // model
        let manager = new THREE.LoadingManager();
        console.log(manager);
        let loader = new THREE.FBXLoader( manager );
        loader.load( './3D/table/table.fbx', function( geometry ) {
            let material = new THREE.MeshNormalMaterial();
            let mesh = new THREE.Mesh(geometry, material);
            console.log(mesh);
            this.scene.add( mesh );
        }, onProgress, onError);

        this.renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( this.renderer.domElement );

        // Add orbit controlls to the scene.
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.maxDistance = 100;
        this.controls.minDistance = 5;
        this.controls.enablePan = false;
        this.controls.enableRotate = true;
        this.controls.minPolarAngle = Math.PI / 6;
        this.controls.maxPolarAngle = Math.PI / 2;
        
        // Add table and set postion
        this.table = new Table();
        this.scene.add(this.table);
        this.table.position.set(0, 0, -1);
        
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
        this.cue = new Cue(this.ballArray[0]);

        this.camera.lookAt(this.ballArray[0].position);
        this.camera.position.set(this.cue.selectedBall.position.x, this.cue.selectedBall.position.x, 40);

        this.players = [
            player1,
            player2
        ];

        // Add objects to the scene.
        for(let i = 0; i < this.ballArray.length; i++){
            this.scene.add(this.ballArray[i]);
        }
        this.scene.add(this.cue);

        // Light
        let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
        let lightBulb1 = new THREE.PointLight(0xFFFFFF, 0.3, 50);
        let lightBulb2 = new THREE.PointLight(0xFFFFFF, 0.3, 50);

        this.scene.add(ambientLight);
        this.scene.add(lightBulb1);
        this.scene.add(lightBulb2);

        lightBulb1.position.set( 0, 9, 8 );
        lightBulb2.position.set( 0, -9, 8 );

        this.clock = new THREE.Clock();
    };

    update(){
        let deltaTime = 60 * this.clock.getDelta();

        for (let i = 0; i < this.ballArray.length; i++) {
            for(let ii=0; ii < this.ballArray.length; ii++){
                if(this.ballArray[i] !== this.ballArray[ii]){
                    this.ballArray[i].checkCollisionBall(this.ballArray[ii]);
                }
            }
            this.ballArray[i].checkCollisionTable(this.table);
            this.ballArray[i].move(deltaTime);
        }
        // Update Cue movement
        this.cue.update(this.camera);
        
        // Set camera to rotate and look at selected ball
        this.camera.lookAt(this.cue.selectedBall.position);
        this.controls.target = this.cue.selectedBall.position; 

        // Update camera
        this.renderer.render(this.scene, this.camera);
    };
}

