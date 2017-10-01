class Table extends THREE.Object3D {
    constructor() {
        super();
        this.dimensions = {
            topLeft: {x: -12, y: 24},
            topRight: {x: 12, y: 24},
            bottomLeft: {x: -12, y: -24},
            bottomRight: {x: 12, y: -24}
        };
        
        // Field textures 
        let fieldGeometry = new THREE.BoxGeometry( 24, 48, 1 );
        let fieldTexture = new THREE.TextureLoader().load( "./textures/table/cloth.jpg" , function(texture){
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( 3, 6 );
        });
        let fieldTextureNRM = new THREE.TextureLoader().load( "./textures/table/clothNRM.jpg", function(texture){
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( 3, 6);
        });
        let fieldTextureSPEC = new THREE.TextureLoader().load( "./textures/table/clothSPEC.jpg", function(texture){
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( 3, 6);
        });
        
        let fieldMaterial = new THREE.MeshPhongMaterial( { color: 0x42a8ff, shininess: 20, bumpMap: fieldTexture, bumpScale: 0.1} );
        let field = new THREE.Mesh( fieldGeometry, fieldMaterial );
        
        field.receiveShadow = true;
        
        // Cloth sides  
        let shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, 22);
        shape.lineTo(0.5, 21.2);
        shape.lineTo(0.5, 0.8);
        shape.lineTo(0 , 0);
        
        let extrudeSettings = {
            steps: 1,
            amount: 1,
            bevelEnabled: false
        };
        
        let clothSideGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings ); 
        
        let clothSideLeftTop = new THREE.Mesh(  clothSideGeometry, fieldMaterial );
        let clothSideRightTop = new THREE.Mesh(  clothSideGeometry, fieldMaterial );
        let clothSideLeftBottom = new THREE.Mesh(  clothSideGeometry, fieldMaterial );
        let clothSideRightBottom = new THREE.Mesh(  clothSideGeometry, fieldMaterial);
        let clothTop = new THREE.Mesh( clothSideGeometry, fieldMaterial );
        let clothBottom = new THREE.Mesh( clothSideGeometry, fieldMaterial );
        
        clothSideLeftTop.position.set(-12, 1, 0.2);
        clothSideRightTop.position.set(12, 1, 1.2);
        clothSideLeftBottom.position.set(-12, -23, 0.2);
        clothSideRightBottom.position.set(12, -23, 1.2);
        
        clothTop.position.set(-11, 24, 0.2);
        clothBottom.position.set(11, -24, 0.2);
        
        clothTop.rotation.set(0, 0, -90 * Math.PI / 180, 0);
        clothBottom.rotation.set(0, 0, 90 * Math.PI / 180, 0);
        
        clothSideRightTop.rotation.set(0, 180 * Math.PI / 180, 0);
        clothSideRightBottom.rotation.set(0, 180 * Math.PI / 180, 0);
        
        // Wood sides
        let woodTexture = new THREE.TextureLoader().load( "./textures/table/wood.jpg");
        let woodMaterial = new THREE.MeshLambertMaterial( { map: woodTexture} );

        let woodSideGeometry = new THREE.BoxGeometry( 1, 22, 3 );
        let woodTopGeometry = new THREE.BoxGeometry( 22, 1, 3 );
        
        let woodSideLeftTop = new THREE.Mesh(  woodSideGeometry, woodMaterial );
        let woodSideRightTop = new THREE.Mesh(  woodSideGeometry, woodMaterial );
        let woodSideLeftBottom = new THREE.Mesh(  woodSideGeometry, woodMaterial );
        let woodSideRightBottom = new THREE.Mesh(  woodSideGeometry, woodMaterial );
        let woodTop = new THREE.Mesh( woodTopGeometry, woodMaterial );
        let woodBottom = new THREE.Mesh( woodTopGeometry, woodMaterial );
        
        woodSideLeftTop.position.set(-12.5, 12, -0.3);
        woodSideRightTop.position.set(12.5, 12, -0.3);
        woodSideLeftBottom.position.set(-12.5, -12, -0.3);
        woodSideRightBottom.position.set(12.5, -12, -0.3);
        woodTop.position.set(0, 24.5, -0.3);
        woodBottom.position.set(0, -24.5, -0.3);
    
        // Holes
        let cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 1.1, 20 );
        let cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
        
        let topLeftCylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        let topRightCylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        let middleLeftCylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        let middleRightCylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        let bottomLeftCylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        let bottomRightCylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    
        topLeftCylinder.position.set(this.dimensions.topLeft.x, this.dimensions.topLeft.y, 0);
        topRightCylinder.position.set(this.dimensions.topRight.x, this.dimensions.topRight.y, 0);
        middleLeftCylinder.position.set(this.dimensions.topLeft.x - 0.5, (this.dimensions.topLeft.y + this.dimensions.bottomLeft.y) / 2, 0);
        middleRightCylinder.position.set(this.dimensions.topRight.x + 0.5, (this.dimensions.topRight.y + this.dimensions.bottomRight.y) / 2, 0);
        bottomLeftCylinder.position.set(this.dimensions.bottomLeft.x, this.dimensions.bottomLeft.y, 0);
        bottomRightCylinder.position.set(this.dimensions.bottomRight.x, this.dimensions.bottomRight.y, 0);
         
        topLeftCylinder.rotation.set(1.5708,0,0);
        topRightCylinder.rotation.set(1.5708,0,0);
        middleLeftCylinder.rotation.set(1.5708,0,0);
        middleRightCylinder.rotation.set(1.5708,0,0);
        bottomLeftCylinder.rotation.set(1.5708,0,0);
        bottomRightCylinder.rotation.set(1.5708,0,0);
        
        // Platinum sides
        let sideGeometry = new THREE.PlaneGeometry( 1.5, 50, 32 );
        let topGeometry = new THREE.PlaneGeometry(26, 1.5, 32 );
        
        let sideMaterial = new THREE.MeshPhongMaterial( {color: 0xE5E4E2, side: THREE.DoubleSide, specular: 0xFFFFFF, shininess: 80} );
        let leftSidePlane = new THREE.Mesh( sideGeometry, sideMaterial );
        let rightSidePlane = new THREE.Mesh( sideGeometry, sideMaterial );
        let topPlane = new THREE.Mesh( topGeometry, sideMaterial );
        let bottomPlane = new THREE.Mesh(topGeometry , sideMaterial);
        
        leftSidePlane.rotation.set(0, -45 * Math.PI / 180, 0);
        rightSidePlane.rotation.set(0, 45 * Math.PI / 180, 0);
        topPlane.rotation.set(-45 * Math.PI / 180, 0, 0);
        bottomPlane.rotation.set(45 * Math.PI / 180, 0, 0);
        
        leftSidePlane.position.set(-13.5,0,0.65);
        rightSidePlane.position.set(13.5,0,0.65);
        topPlane.position.set(0,25.5,0.65);
        bottomPlane.position.set(0, -25.5, 0.65);
        
        let bottomGeometry = new THREE.CubeGeometry(28.04, 52.04, 4);
        let bottom = new THREE.Mesh(bottomGeometry, sideMaterial); 
        
        bottom.position.set(0,0,-1.87);
        
        // Shadows
        field.receiveShadow = true;
        clothSideLeftTop.receiveShadow = true;
        clothSideRightTop.receiveShadow = true;
        clothSideLeftBottom.receiveShadow = true;
        clothSideRightBottom.receiveShadow = true;
        
        this.add( field );
        
        this.add( woodSideLeftTop );
        this.add( woodSideRightTop );
        this.add( woodSideLeftBottom );
        this.add( woodSideRightBottom );
        this.add( woodTop );
        this.add( woodBottom );
        
        this.add( clothSideLeftTop );
        this.add( clothSideRightTop );
        this.add( clothSideLeftBottom );
        this.add( clothSideRightBottom );
        this.add( clothTop );
        this.add( clothBottom );
        
        this.add( topLeftCylinder );
        this.add( topRightCylinder );
        this.add( middleLeftCylinder );
        this.add( middleRightCylinder );
        this.add( bottomLeftCylinder );
        this.add( bottomRightCylinder );
        
        this.add( leftSidePlane );
        this.add( rightSidePlane );
        this.add(topPlane);
        this.add(bottomPlane);
        
        this.add(bottom);
    }
}