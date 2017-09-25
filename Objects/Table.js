class Table extends THREE.Object3D {
    constructor() {
        super();
        this.dimensions = {
            topLeft: {x: -12, y: 24},
            topRight: {x: 12, y: 24},
            bottomLeft: {x: -12, y: -24},
            bottomRight: {x: 12, y: -24}
        };
        
        let fieldGeometry = new THREE.BoxGeometry( 24, 48, 1 );
        let fieldTexture = new THREE.TextureLoader().load( "./textures/table/cloth.jpg" , function(texture){
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( 4, 4 );
        });
        let fieldTextureNRM = new THREE.TextureLoader().load( "./textures/table/clothNRM.jpg", function(texture){
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set( 0, 0 );
            texture.repeat.set( 4, 4 );
        });
        let fieldTextureSPEC = new THREE.TextureLoader().load( "./textures/table/clothSPEC.jpg");
        
        let fieldMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00, map: fieldTexture, bumpMap: fieldTextureNRM} );
        let field = new THREE.Mesh( fieldGeometry, fieldMaterial );
     
        this.add( field );

        // let tableGeometry = new THR
        // let mesh = new THREE.Mesh();
    }
}