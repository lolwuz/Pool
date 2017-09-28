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
        
        let fieldMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00, map: fieldTexture, bumpMap: fieldTextureNRM, bumpScale: 0.1, shininess: 20, specularMap: fieldTextureSPEC} );
        let field = new THREE.Mesh( fieldGeometry, fieldMaterial );
        
        // Cloth sides
        let clothTexture = new THREE.TextureLoader().load( "./textures/table/cloth.jpg");
        let clothMaterial = new THREE.MeshPhongMaterial( { map: clothTexture} );
        
        let clothSideGeometry = new THREE.BoxGeometry( 0.5, 21, 1 );
        let clothTopGeometry = new THREE.BoxGeometry( 21, 0.5, 1 );
        
        let clothSideLeftTop = new THREE.Mesh(  clothSideGeometry, clothMaterial );
        let clothSideRightTop = new THREE.Mesh(  clothSideGeometry, clothMaterial );
        let clothSideLeftBottom = new THREE.Mesh(  clothSideGeometry, clothMaterial );
        let clothSideRightBottom = new THREE.Mesh(  clothSideGeometry, clothMaterial );
         
        let clothTop = new THREE.Mesh( clothTopGeometry, clothMaterial );
        let clothBottom = new THREE.Mesh( clothTopGeometry, clothMaterial );
        
        clothSideLeftTop.position.set(-11.75, 12, 0.7);
        clothSideRightTop.position.set(11.75, 12, 0.7);
        clothSideLeftBottom.position.set(-11.75, -12, 0.7);
        clothSideRightBottom.position.set(11.75, -12, 0.7);
        clothTop.position.set(0, 23.75, 0.7);
        clothBottom.position.set(0, -23.75, 0.7);
        
        // Wood sides
        let woodTexture = new THREE.TextureLoader().load( "./textures/table/floorwood.jpg");
        let woodMaterial = new THREE.MeshPhongMaterial( { map: woodTexture} );

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
        
        // Shadows
        woodSideLeftTop.receiveShadow = true;
        woodSideRightTop.receiveShadow = true;
        woodTop.receiveShadow = true;
        woodBottom.receiveShadow = true;
        field.receiveShadow = true;
        
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
        
        

        // let tableGeometry = new THR
        // let mesh = new THREE.Mesh();
        
        this.receiveShadow = true;
    }
}