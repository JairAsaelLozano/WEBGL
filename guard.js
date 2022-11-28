class Guard {
 
    constructor(){
        this.state = 1;
        this.animations = [];    
    }

    get index(){
        return this.state;
    }

    play(){
        this.wait -= 1;
        //console.log(this.wait);

        //console.log("wait: " + this.wait + "_selectDir: " + this.selectDir + "_Xpos: " + this.modelRef.position.x + "_ Zpos: " + this.modelRef.position.z);

        //console.log(this.selectDir);
        if(!this.catch){
            if(this.wait < 0){
                this.setIndex(3);

                if(this.selectDir == -1){
                    while (this.selectDir == -1) {
                        var random = Math.floor(Math.random() * 4);

                        //console.log(random);
                        //console.log("X:" + this.modelRef.position.x + " X:" + this.positions[random][0] + " Z:" + this.modelRef.position.z + " Z:" + this.positions[random][1]);
                        if((this.modelRef.position.x == this.positions[random][0] && this.modelRef.position.z == this.positions[random][1])){
                            //console.log("stoy dentro");
                            if(Math.floor(Math.random() * 2) == 1){
                                this.selectDir = random;
                            }else{
                                this.selectDir = random + 4;
                            }
                        }
                        
                    }
                }else{
                    if(this.selectDir == 0){
                        this.playAnimation(-3, 0, 0);

                        if(this.positions[1][0] >= this.modelRef.position.x){
                            this.modelRef.position.x = this.positions[1][0];

                            this.selectDir = -1;
                            this.wait = 50;   
                        }
                    }
                    if(this.selectDir == 1){
                        this.playAnimation(3, 0, 0);

                        if(this.positions[0][0] <= this.modelRef.position.x){
                            this.modelRef.position.x = this.positions[0][0];

                            this.selectDir = -1;
                            this.wait = 50;   
                        }
                        
                    }

                    if(this.selectDir == 2){
                        this.playAnimation(3, 0, 0);

                        if(this.positions[3][0] <= this.modelRef.position.x){
                            this.modelRef.position.x = this.positions[3][0];

                            this.selectDir = -1;
                            this.wait = 50;   
                        }
                    }

                    if(this.selectDir == 3){
                        this.playAnimation(-3, 0, 0);

                        if(this.positions[2][0] >= this.modelRef.position.x){
                            this.modelRef.position.x = this.positions[2][0];

                            this.selectDir = -1;
                            this.wait = 50;   
                        }
                        
                    }

                    if(this.selectDir == 4){
                        this.playAnimation(0, 0, 3);

                        if(this.positions[3][1] <= this.modelRef.position.z){
                            this.modelRef.position.z = this.positions[3][1];

                            this.selectDir = -1;
                            this.wait = 50;
                        }
                    }

                    if(this.selectDir == 5){
                        this.playAnimation(0, 0, 3);

                        if(this.positions[2][1] <= this.modelRef.position.z){
                            this.modelRef.position.z = this.positions[2][1];

                            this.selectDir = -1;
                            this.wait = 50;
                        }
                    }

                    if(this.selectDir == 6){
                        this.playAnimation(0, 0, -3);

                        if(this.positions[1][1] >= this.modelRef.position.z){
                            this.modelRef.position.z = this.positions[1][1];

                            this.selectDir = -1;
                            this.wait = 50;
                        }
                    }

                    if(this.selectDir == 7){
                        this.playAnimation(0, 0, -3);

                        if(this.positions[0][1] >= this.modelRef.position.z){
                            this.modelRef.position.z = this.positions[0][1];

                            this.selectDir = -1;
                            this.wait = 50;
                        }
                    }
                }

                //this.wait = 200;
            }else{
                this.setIndex(1);
                this.playAnimation(0, 0, 0);
            }
        }else{
            this.setIndex(5);
            this.playAnimation(0, 0, 0);
        }
    }

    setIndex(value){
        this.state = value;
    }

    setCatch(isCatched, playerX, playerZ){
        this.catch = isCatched;
        this.playerX = playerX;
        this.playerZ = playerZ;
    }

    get mixers(){
        return this.animations;
    }

    setPositions(newPositions){
        this.positions.push(newPositions);
    }

    setModel(modelName, myModel, xPos, yPos, zPos){
        this.modelRef;
        this.stopped;
        this.walk;
        this.jump;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.wait = 50;
        this.selectDir = -1;
        this.positions = [];
        this.catch = false;

        this.maxJump = 4.6;
        this.jumping = false;
        this.isJump = false;

        var loader = new THREE.FBXLoader();
 		loader.load(modelName, function (object){
			object.mixer = new THREE.AnimationMixer(object);

			myModel.mixers.push(object.mixer);

			myModel.stopped = object.mixer.clipAction(object.animations[5]);
            myModel.rage = object.mixer.clipAction(object.animations[1]);
            myModel.walk = object.mixer.clipAction(object.animations[2]);
            myModel.jump = object.mixer.clipAction(object.animations[10]);

			myModel.stopped.play();
            myModel.rage.play();
            myModel.walk.play();
            myModel.jump.play();

            myModel.stopped.weight = 1;
            myModel.rage.weight = 0;
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
            case 1:{
                this.stopped.weight = 1;
                this.walk.weight = 0;
                this.jump.weight = 0;

            }break;

            case 2:{
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

            case 5:{
                this.stopped.weight = 0;
                this.walk.weight = 0;
                this.jump.weight = 0;
                this.rage.weight = 1;

                this.modelRef.position.x += 0;
                this.modelRef.position.z += 0;

                this.modelRef.rotation.y = THREE.Math.degToRad( 45 );
                //console.log(Math.sqrt( Math.pow((this.modelRef.position.x - this.playerX), 2) + Math.pow((this.modelRef.position.z - this.playerZ), 2) ) );
                //console.log( Math.tan((this.modelRef.position.z - this.playerZ) / (this.modelRef.position.x - this.playerX)) );
                //console.log( Math.atan( ( 0 - ((this.modelRef.position.z - this.playerZ) / (this.modelRef.position.x - this.playerX))) / (1 + (0 * (this.modelRef.position.z - this.playerZ) / (this.modelRef.position.x - this.playerX)))  ) );
            }

        }


        if (this.mixers.length > 0) {
            for (var i = 0; i < this.mixers.length; i++) {
                this.mixers[i].update(deltaTime);
            }
        }
    }
}