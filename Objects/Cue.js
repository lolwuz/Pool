class Cue extends THREE.Mesh{
    constructor(){
        var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        super(geometry, material);
    };
}