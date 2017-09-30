class Helper extends THREE.Mesh{
    constructor(start, angle){
        let geometry = new THREE.CylinderGeometry( 0.1, 0.1, 20, 32 );
        let material = new THREE.MeshPhongMaterial({
            color: 0xff0000,
        });
        
        let dx = Math.sin(angle) * 1000;
        let dy = Math.cos(angle) * 1000;
        
        super(geometry, material);
    };
    

    checkCollide(table, target, angle){ 
        let dx = Math.sin(-angle) * 100.0;
        let dy = Math.cos(-angle) * 100.0; 
        
        let targetLine = { x:  target.x + dx, y: target.y + dy};
            
        let returnArr = [
            this.checkLineCollide(target, targetLine, table.dimensions.topLeft, table.dimensions.bottomLeft),
            this.checkLineCollide(target, targetLine, table.dimensions.bottomLeft, table.dimensions.bottomRight),
            this.checkLineCollide(target, targetLine, table.dimensions.bottomRight, table.dimensions.topRight),
            this.checkLineCollide(target, targetLine, table.dimensions.topRight, table.dimensions.topLeft)
        ];
        
        for(let i = 0; i < returnArr.length; i++){
            if(returnArr[i] !== "null"){     
                
                let dx = target.x - returnArr[i].x;
                let dy = target.y - returnArr[i].y;
                
                
                let length = Math.atan2(dx, dy);
                console.log(length);
                let geometry = new THREE.CylinderGeometry( 0.1, 0.1, length, 32 );
                this.geometry = geometry;
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