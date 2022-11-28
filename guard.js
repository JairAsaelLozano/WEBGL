class Guard {
 
    constructor(){
        this.state = 1;
        this.animations = [];    
    }

    get index(){
        return this.state;
    }

    setIndex(value){
        this.state = value;
    }

    get mixers(){
        return this.animations;
    }

    setModel(modelName, myModel, xPos, yPos, zPos){
        this.modelRef;
        this.start;
        this.stopped;
        this.walk;
        this.jump;
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.maxJump = 4.6;
        this.jumping = false;
        this.isJump = false;

        this.beggin = true;
        this.countBeggin = 0;

        var loader = new THREE.FBXLoader();
 		loader.load(modelName, function (object){
			object.mixer = new THREE.AnimationMixer(object);

			myModel.mixers.push(object.mixer);

            myModel.start = object.mixer.clipAction(object.animations[0]);
			myModel.stopped = object.mixer.clipAction(object.animations[5]);
            myModel.walk = object.mixer.clipAction(object.animations[2]);
            myModel.jump = object.mixer.clipAction(object.animations[10]);

            myModel.start.play();
			myModel.stopped.play();
            myModel.walk.play();
            myModel.jump.play();

            myModel.start.weight = 1;
            myModel.stopped.weight = 0;
            myModel.walk.weight = 0;
            myModel.jump.weight = 0;

            object.position.x = xPos;
			object.position.y = yPos;
            object.position.z = zPos;
            
            myModel.modelRef = object;
            
			object.scale.set(4,4,4);
            object.rotation.y = THREE.Math.degToRad(90);
			
			scene.add(object);
		});
    }

    getPosition(){
        return this.modelRef.position;
    }
    getPositionx(){
        return this.modelRef.position.x;
    }
    getPositionz(){
        return this.modelRef.position.z;
    }

    playAnimation(guardMovX, guardMovY, guardMovZ){
        switch(this.index){
            case 0:{
                this.start.weight = 1;
                this.stopped.weight = 0;
                this.walk.weight = 0;
                this.jump.weight = 0;

            }break;

            case 1:{
                this.start.weight = 0;
                this.stopped.weight = 1;
                this.walk.weight = 0;
                this.jump.weight = 0;

            }break;

            case 2:{
                this.start.weight = 0;
                this.stopped.weight = 0;
                this.walk.weight = 1;
                this.jump.weight = 0;

                this.modelRef.position.x += guardMovX*deltaTime;
                this.modelRef.position.z += guardMovZ*deltaTime;

                if(guardMovX > 0 && guardMovZ == 0){
                    this.modelRef.rotation.y = THREE.Math.degToRad(90);
                }
                else if(guardMovX < 0 && guardMovZ == 0){
                    this.modelRef.rotation.y = THREE.Math.degToRad(-90);
                }
                else if(guardMovZ > 0 && guardMovX == 0){
                    this.modelRef.rotation.y = THREE.Math.degToRad(0);
                }
                else if (guardMovZ < 0 && guardMovX == 0) {
                    this.modelRef.rotation.y = THREE.Math.degToRad(180);
                }

            }break;

            case 3:{
                this.start.weight = 0;
                this.stopped.weight = 1;
                this.walk.weight = 1;
                this.jump.weight = 0;

                this.modelRef.position.x += guardMovX*deltaTime;
                this.modelRef.position.z += guardMovZ*deltaTime;

                if(guardMovX > 0 && guardMovZ == 0){
                    this.modelRef.rotation.y = THREE.Math.degToRad(90);
                }
                else if(guardMovX < 0 && guardMovZ == 0){
                    this.modelRef.rotation.y = THREE.Math.degToRad(-90);
                }
                else if(guardMovZ > 0 && guardMovX == 0){
                    this.modelRef.rotation.y = THREE.Math.degToRad(0);
                }
                else if (guardMovZ < 0 && guardMovX == 0) {
                    this.modelRef.rotation.y = THREE.Math.degToRad(180);
                }

            }break;

            case 4:{
                this.start.weight = 0;
                this.stopped.weight = 0;
                this.walk.weight = 0;
                this.jump.weight = 1;

                this.modelRef.position.x += guardMovX*deltaTime;
                if(this.jumping){
                    this.modelRef.position.y += 8*deltaTime;
                }else{
                    this.modelRef.position.y -= 8*deltaTime;   
                }
                //this.modelRef.position.y += playerMovY*deltaTime;
                this.modelRef.position.y = Math.round((this.modelRef.position.y + Number.EPSILON) * 10) / 10;

                //console.log(this.modelRef.position.y);


                if(guardMovX > 0){
                    this.modelRef.rotation.y = THREE.Math.degToRad(90);
                }
                else if(guardMovX < 0){
                    this.modelRef.rotation.y = THREE.Math.degToRad(-90);
                }

            }break;

        }


        if (this.mixers.length > 0) {
            for (var i = 0; i < this.mixers.length; i++) {
                this.mixers[i].update(deltaTime);
            }
        }
    }
}