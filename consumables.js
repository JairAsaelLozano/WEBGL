class Consumables {

    constructor(){

    }


    setModel(route, model, mtl, type, xPos, yPos, zpos, scale){
        this.type = type;
        this.object;
        this.isCol = false;

        loadOBJWithMTL(route, model, mtl, (object) => {

            object.position.x = xPos;
			object.position.z = zpos;
            object.position.y = yPos;
            object.scale.set(scale, scale, scale);
            this.object = object;

            scene.add(object);
        });
    }
}