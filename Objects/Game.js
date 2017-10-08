class Game {
    constructor(player1, player2) {
        // Create a scene with objects.
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.up.set(0, 0, 1);
        this.renderer = new THREE.WebGLRenderer({
            canvas: poolCanvas
        });
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.shadowMap.enabled = false;
        this.renderer.shadowMap.type = THREE.BasicShadowMap;

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
        this.table.castShadow = true;
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
        this.controls.maxDistance = 50;
        this.controls.minDistance = 5;
        this.controls.enablePan = false;
        this.controls.enableRotate = true;
        this.controls.minPolarAngle = Math.PI / 6;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.target = this.ballArray[0].position;
        this.controls.update();

        // Add spaceship     
        let spaceGroundGeometry = new THREE.BoxGeometry(150, 300, 2);
        let spaceGroundTexture = new THREE.TextureLoader().load("./textures/hulltexture.png", function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(6, 12);
        });
        
        let spaceGroundMaterial = new THREE.MeshStandardMaterial({
            color: 0xb4b4b4,
            map: spaceGroundTexture,
            metalness: 0.2,
            roughtness: 0.2
        });
        let spaceGroundMesh = new THREE.Mesh(spaceGroundGeometry, spaceGroundMaterial);
        let spaceTopMesh = new THREE.Mesh(spaceGroundGeometry, spaceGroundMaterial);

        let spaceSideGeometry = new THREE.BoxGeometry(2, 300, 80);
        let spaceTopGeometry = new THREE.BoxGeometry(2, 300, 160);
        let spaceSideMaterial = new THREE.MeshStandardMaterial({
            color: 0x5ccdff,
            transparent: true,
            opacity: 0.4,
            metalness: 0
        });


        let spaceLeftSideMesh = new THREE.Mesh(spaceSideGeometry, spaceSideMaterial);
        let spaceRightSideMesh = new THREE.Mesh(spaceSideGeometry, spaceSideMaterial);
        let spaceTopSideMesh = new THREE.Mesh(spaceTopGeometry, spaceGroundMaterial);
        let spaceBottomSideMesh = new THREE.Mesh(spaceTopGeometry, spaceGroundMaterial);

        spaceGroundMesh.position.set(0, 0, -12);
        spaceTopMesh.position.set(0, 0, 40);  
        spaceLeftSideMesh.position.set(73, 0, -2);
        spaceRightSideMesh.position.set(-73, 0, -2);
        spaceTopSideMesh.position.set(0, 150, -2);
        spaceBottomSideMesh.position.set(0, -150, -2);
        
        spaceTopSideMesh.rotation.set(0, 0, -90 * Math.PI / 180);
        spaceBottomSideMesh.rotation.set(0, 0, 90 * Math.PI / 180);

        this.scene.add(spaceGroundMesh);
        this.scene.add(spaceTopMesh);
        this.scene.add(spaceLeftSideMesh);
        this.scene.add(spaceRightSideMesh);
        this.scene.add(spaceTopSideMesh);
        this.scene.add(spaceBottomSideMesh);

        // Add background 
        let earthGeometry = new THREE.SphereGeometry(100, 128, 128);
        let earthTexture = new THREE.TextureLoader().load("./textures/earth8k.jpg");
        let earthMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            map: earthTexture,
            bumpMap: earthTexture,
            bumpScale: 1,
            metalness: 0,
            roughness: 0.3
        });
        this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.earthMesh.position.set(200, 0, 0);
        this.scene.add(this.earthMesh);

        //let floorGeometry = new THREE.CubeGemetry(); 

        // Lights 
        let ambient = new THREE.AmbientLight(0xFFFFFF, 0.2);
        let sun = new THREE.SpotLight(0xFFFFFF, 1);
        sun.position.set(100, 200, 50);
        sun.angle = 0.5;
        sun.target = this.earthMesh;

        let pointLight1 = new THREE.PointLight(0xFFFFFF, 0.4, 100);
        pointLight1.position.set(-5, -12, 20);
        pointLight1.castShadow = true;

        let pointLight2 = new THREE.PointLight(0xFFFFFF, 0.4, 100);
        pointLight2.position.set(5, -12, 20);
        pointLight2.castShadow = true;

        let pointLight3 = new THREE.PointLight(0xFFFFFF, 0.4, 100);
        pointLight3.position.set(-5, 12, 20);
        pointLight3.castShadow = true;

        let pointLight4 = new THREE.PointLight(0xFFFFFF, 0.4, 100);
        pointLight4.position.set(5, 12, 20);
        pointLight4.castShadow = true;

        let floatLight = new THREE.PointLight(0x0089ff, 0.4, 100);
        floatLight.position.set(0, 0, -5);


        this.scene.add(pointLight1);
        this.scene.add(pointLight2);
        this.scene.add(pointLight3);
        this.scene.add(pointLight4);
        this.scene.add(sun);
        this.scene.add(ambient);
        this.scene.add(floatLight);

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

    // Check which balls are pocketed this turn and add them to the current players' ballArray.
    ballsPocketed() {
        for (let i = 0; i < this.ballArray.length; i++) {
            if (this.ballArray[i].pocketed) {
                if (this.players[0].isMyTurn) {
                    this.players[0].pocketBall(this.ballArray[i]);
                } else {
                    this.players[1].pocketBall(this.ballArray[i]);
                }
                this.ballArray.splice(i);
            }
        }
    }
}
