class Helper extends THREE.Mesh{
    constructor(start, angle){
        var geometry = new THREE.SphereGeometry(0.5, 128, 128);;        
        let material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
        });    
        super(geometry, material);
    };
    

    checkCollide(table, target, angle){ 
        let dx = Math.sin(-angle) * 100;
        let dy = Math.cos(-angle) * 100; 
        
        let targetLine = { x:  target.x + dx, y: target.y + dy};
            
        let returnArr = [
            this.checkLineCollide(target, targetLine, table.dimensions.topLeft, table.dimensions.bottomLeft),
            this.checkLineCollide(target, targetLine, table.dimensions.bottomLeft, table.dimensions.bottomRight),
            this.checkLineCollide(target, targetLine, table.dimensions.bottomRight, table.dimensions.topRight),
            this.checkLineCollide(target, targetLine, table.dimensions.topRight, table.dimensions.topLeft)
        ];
        
        for(let i = 0; i < returnArr.length; i++){
            if(returnArr[i] !== "null"){     
                this.position.set(returnArr[i].x, returnArr[i].y, 0); 
                return returnArr[i];
            }
        }
    };
    
    checkLineCollide(pos1, pos2, pos3, pos4){
        let A1 = pos2.y - pos1.y;
        let B1 = pos1.x - pos2.x;
        let C1 = A1 * pos1.x + B1 * pos1.y;
        let A2 = pos4.y - pos3.y;
        let B2 = pos3.x - pos4.x;
        let C2 = A2* pos3.x + B2 * pos3.y;
        let det = A1 * B2 - A2 * B1;
        
        
        if(det !== 0){
            let x = (B2*C1 - B1*C2)/det;
            let y = (A1*C2 - A2*C1)/det;
            if(x >= Math.min(pos1.x, pos2.x) && x <= Math.max(pos1.x, pos2.x) 
                && x >= Math.min(pos3.x, pos4.x) && x <= Math.max(pos3.x, pos4.x)
                && y >= Math.min(pos1.y, pos2.y) && y <= Math.max(pos1.y, pos2.y) 
                && y >= Math.min(pos3.y, pos4.y) && y <= Math.max(pos3.y, pos4.y)){
                return {x: x, y: y}
            };     
        }  
        
        return "null";
    };
}