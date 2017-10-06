class Game {
    constructor(player1, player2) {
        // Create a scene with objects.
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.up.set(0, 0, 1);
        this.renderer = new THREE.WebGLRenderer({
            canvas: poolCanvas,
            antialias: true
        });
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.shadowMapEnabled = false;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);


        // Load cubeMap
        let path = "./textures/starmap/";
        let format = ".jpg";
        var urls = [
						path + 'px' + format, path + 'mx' + format,
						path + 'py' + format, path + 'my' + format,
						path + 'pz' + format, path + 'mz' + format
					];
        let cubeMaterial = new THREE.CubeTextureLoader().load(urls);
        cubeMaterial.format = THREE.RGBFormat;
        
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
        this.scene.add(this.cubeMesh);
    

        // Add table and set postion
        this.table = new Table();
        this.scene.add(this.table);
        this.table.position.set(0, 0, -1);

        // Add balls
        this.ballArray = [
            new Ball(0, {
                x: 0,
                y: -16
            }),
            new Ball(9, {
                x: 0,
                y: 13
            }),
            new Ball(12, {
                x: -0.51,
                y: 14
            }),
            new Ball(7, {
                x: 0.51,
                y: 14
            }),
            new Ball(1, {
                x: -1.01,
                y: 15
            }),
            new Ball(8, {
                x: 0,
                y: 15
            }),
            new Ball(15, {
                x: 1.01,
                y: 15
            }),
            new Ball(14, {
                x: -1.53,
                y: 16
            }),
            new Ball(3, {
                x: -0.51,
                y: 16
            }),
            new Ball(10, {
                x: 0.51,
                y: 16
            }),
            new Ball(6, {
                x: 1.53,
                y: 16
            }),
            new Ball(5, {
                x: -2.02,
                y: 17
            }),
            new Ball(4, {
                x: -1.01,
                y: 17
            }),
            new Ball(13, {
                x: 0,
                y: 17
            }),
            new Ball(2, {
                x: 1.01,
                y: 17
            }),
            new Ball(11, {
                x: 2.02,
                y: 17
            })
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
        for (let i = 0; i < this.ballArray.length; i++) {
            this.scene.add(this.ballArray[i]);
        }

        console.log(this.ballArray[0]);
        this.scene.add(this.cue);
        this.scene.add(this.helper);

        // Add orbit controlls to the scene.
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.maxDistance = 100;
        this.controls.minDistance = 5;
        this.controls.enablePan = false;
        this.controls.enableRotate = true;
        this.controls.minPolarAngle = Math.PI / 6;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.target = this.ballArray[0].position;
        this.controls.update();
        
        // Add background 
        let earthGeometry = new THREE.SphereGeometry(100, 128, 128);
        let earthTexture = new THREE.TextureLoader().load("./textures/earth8k.jpg");
        let earthBump = new THREE.TextureLoader().load("./textures/earth8kBumb.png");
        let earthMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            map: earthTexture,
            bumpMap: earthBump,
            bumpScale: 0.1
        });
        this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.earthMesh.position.set(200, 0, 0);
        this.scene.add(this.earthMesh);
        
        //let floorGeometry = new THREE.CubeGemetry(); 
        
        // Lights 
        let ambient = new THREE.AmbientLight(0xFFFFFF, 0.2);
        let sun = new THREE.SpotLight(0xFFFFFF, 1);
        sun.position.set(40, 50, 40);
        sun.angle = 1.05;
        sun.target = this.earthMesh;
        
        let pointLight1 = new THREE.PointLight(0xFFFFFF, 0.4, 100);
        pointLight1.position.set(-5, -12, 20);
        pointLight1.castShadow = true;

        let pointLight2 = new THREE.PointLight(0xFFFFFF, 0.4, 100);
        pointLight2.position.set(5, -12, 20);
        pointLight1.castShadow = true;

        let pointLight3 = new THREE.PointLight(0xFFFFFF, 0.4, 100);
        pointLight3.position.set(-5, 12, 20);
        pointLight1.castShadow = true;

        let pointLight4 = new THREE.PointLight(0xFFFFFF, 0.4, 100);
        pointLight4.position.set(5, 12, 20);
        pointLight1.castShadow = true;
        
        this.scene.add(pointLight1);
        this.scene.add(pointLight2);
        this.scene.add(pointLight3);
        this.scene.add(pointLight4);
        this.scene.add(sun);
        this.scene.add(ambient);
        
        // Add Clock 
        this.clock = new THREE.Clock();

    };

    update() {
        let deltaTime = 60 * this.clock.getDelta();

        for (let i = 0; i < this.ballArray.length; i++) {
            for (let ii = 0; ii < this.ballArray.length; ii++) {
                if (this.ballArray[i] !== this.ballArray[ii]) {
                    this.ballArray[i].checkCollisionBall(this.ballArray[ii], this.hitSound);
                }
            }
            this.ballArray[i].checkCollisionTable(this.table);
            // this.ballArray[i].checkCollisionHole(this.table);
            this.ballArray[i].move(deltaTime);
        }
        // Update Cue movement

        this.controls.target = this.cue.selectedBall.position;
        this.controls.update();
        
        // Update earth rotation
        this.earthMesh.rotation.z += 0.001 * deltaTime;

        this.cue.update(this.controls);
        //this.helper.checkCollide(this.table, this.cue.selectedBall.position, this.cue.rotation.z);

        // Update camera
        this.renderer.render(this.scene, this.camera);
    };
}
