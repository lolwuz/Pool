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
        
        // Wood sides
        let woodTexture = new THREE.TextureLoader().load( "./textures/table/floorwood.jpg");
        let woodMaterial = new THREE.MeshPhongMaterial( { map: woodTexture} );
        
        let woodSideGeometry = new THREE.BoxGeometry( 1, 22, 3 );
        let woodTopGeometry = new THREE.BoxGeometry( 22, 1, 3 );
        
        let woodSideLeft = new THREE.Mesh(  woodSideGeometry, woodMaterial );
        let woodSideRight = new THREE.Mesh(  woodSideGeometry, woodMaterial );
        
        
        let woodTop = new THREE.Mesh( woodTopGeometry, woodMaterial );
        let woodBottom = new THREE.Mesh( woodTopGeometry, woodMaterial );
        
        
        woodSideLeft.position.set(-12.5, 0, -0.5);
        woodSideRight.position.set(12.5, 0, -0.5);
        
        woodTop.position.set(0, 24.5, -0.5);
        woodBottom.position.set(0, -24.5, -0.5);
        
        
        woodSideLeft.receiveShadow = true;
        woodSideRight.receiveShadow = true;
        woodTop.receiveShadow = true;
        woodBottom.receiveShadow = true;
        field.receiveShadow = true;
        
        this.add( field );
        this.add( woodSideLeft );
        this.add( woodSideRight );
        this.add( woodTop );
        this.add( woodBottom );
        
        

        // let tableGeometry = new THR
        // let mesh = new THREE.Mesh();
        
        this.receiveShadow = true;
    }
}