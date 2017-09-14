class Table extends THREE.Object3D {
    constructor() {
        super();

        // table surface
        this.add(this.surface);

        // table legs
        let leg1 = new TableLeg();
            leg1.translateX(78);
            leg1.translateZ(35);

        // more
        this.add(leg1);

        // Dimensions
        this.dimensions = {
            topLeft: {x: -9, y: 18},
            topRight: {x: 9, y: 18},
            bottomLeft: {x: -9, y: -18},
            bottomRight: {x: 9, y: -18}
        };
    }

    get surface() 
    {
        let texture = new THREE.TextureLoader().load('./textures/table/cloth.jpg');

        let geometry = new THREE.BoxGeometry(18, 36, -0.7);
        let material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture,
            bumpMap: texture,
            shininess: 70});

        return new THREE.Mesh(geometry, material);
    }
}

class TableLeg {
    constructor() {
        this.group = new THREE.Object3D();
        this.group.add(this.leg);

        return this.group;
    }

    get leg() {
        let geometry = new THREE.CylinderGeometry(7, 3, 10, 32);
        geometry.translate(0, -55, 0);

        let material = new THREE.MeshPhongMaterial({
            color: 0x000
        });

        return new THREE.Mesh(geometry, material);
    }
}