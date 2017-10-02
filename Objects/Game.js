class Game{
    constructor(player1, player2){
        // Create a scene with objects.
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

        this.camera.up.set( 0, 0, 1 );
        this.renderer = new THREE.WebGLRenderer({ canvas: poolCanvas,  antialias: true});
        this.renderer.setClearColor(0xCCCCFF, 1);
        this.renderer.shadowMap.Enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.shadowMapSoft = true;
        
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );


        // Load cubeMap
        let path = "./3D/texture/sky/";
        let format = ".jpg";
        let urls = [
            path + 'face-l' + format, path + 'face-f' + format,
            path + 'face-r' + format, path + 'face-b' + format,
            path + 'face-t' + format, path + 'face-d' + format
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

        this.cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000), material);
        this.cubeMesh.scale.y = 1;
        this.scene.add(this.cubeMesh);
   
    
        
        //Create an AudioListener and add it to the camera
        let listener = new THREE.AudioListener();
        this.camera.add( listener );

        //Create the PositionalAudio object (passing in the listener)
        this.hitSound = new THREE.PositionalAudio( listener );
      

        //Load a sound and set it as the PositionalAudio object's buffer
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( './sound/hit.mp3', function( buffer ) {
            game.hitSound.setBuffer( buffer );
            game.hitSound.setRefDistance( 20 );
        });

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
        this.table.receiveShadow = true;
        
        // Add balls
        this.ballArray = [
            new Ball(0, {x: 0, y: -16}),
            new Ball(9, {x: 0, y: 13}),
            new Ball(12, {x: -0.51, y: 14}),
            new Ball(7, {x: 0.51, y: 14}),
            new Ball(1, {x: -1.01, y: 15}),
            new Ball(8, {x: 0, y: 15}),
            new Ball(15, {x: 1.01, y: 15}),
            new Ball(14, {x: -1.53, y: 16}),
            new Ball(3, {x: -0.51, y: 16}),
            new Ball(10, {x: 0.51, y: 16}),
            new Ball(6, {x: 1.53, y: 16}),
            new Ball(5, {x: -2.02, y: 17}),
            new Ball(4, {x: -1.01, y: 17}),
            new Ball(13, {x: 0, y: 17}),
            new Ball(2, {x: 1.01, y: 17}),
            new Ball(11, {x: 2.02, y: 17})
        ];
        
        // Add cue + helper
        this.cue = new Cue(this.ballArray[0]);
        this.helper = new Helper(this.cue.selectedBall.position, this.cue.rotation.z);
    

        this.camera.lookAt(this.ballArray[0].position);
        this.camera.position.set(this.cue.selectedBall.position.x, this.cue.selectedBall.position.y, 40);

        this.players = [
            player1,
            player2
        ];

        // Add objects to the scene.
        for(let i = 0; i < this.ballArray.length; i++){
            this.ballArray[i].add(this.hitSound);
            this.scene.add(this.ballArray[i]);
        }
        
        console.log(this.ballArray[0]);
        this.scene.add(this.cue);
        this.scene.add(this.helper);
        
        // Lights 
        let ambient = new THREE.AmbientLight(0xffffdd, 0.1);
        
        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
        directionalLight.position.set(0, 10, 20);
        directionalLight.castShadow = true;
        
        let pointLight1 = new THREE.PointLight( 0xffffff, 0.2, 100 );
        pointLight1.position.set( 0, -12, 20 );
        pointLight1.castShadow = true;

        let pointLight2 = new THREE.PointLight( 0xffffff, 0.2, 100 );
        pointLight2.position.set( 0, 12, 20);
        pointLight2.castShadow = true;
        
        this.scene.add( directionalLight );
        this.scene.add( ambient );
        this.scene.add( pointLight1 );
        this.scene.add( pointLight2 );
    
        
        // Add Clock 
        this.clock = new THREE.Clock();

    };

    update(){
        let deltaTime = 60 * this.clock.getDelta();

        for (let i = 0; i < this.ballArray.length; i++) {
            for(let ii=0; ii < this.ballArray.length; ii++){
                if(this.ballArray[i] !== this.ballArray[ii]){
                    this.ballArray[i].checkCollisionBall(this.ballArray[ii], this.hitSound);
                }
            }
            this.ballArray[i].checkCollisionTable(this.table);
            this.ballArray[i].move(deltaTime);
        }
        // Update Cue movement
        this.cue.update(this.camera);
        this.helper.checkCollide(this.table, this.cue.selectedBall.position, this.cue.rotation.z);

        
        // Set camera to rotate and look at selected ball
        this.camera.lookAt(this.cue.selectedBall.position);
        this.controls.target.set(this.cue.selectedBall.position.x, this.cue.selectedBall.position.y, 0); 
        
        this.controls.update();

        // Update camera
        this.renderer.render(this.scene, this.camera);
    };
}

