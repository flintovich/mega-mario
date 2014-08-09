window.onload = function(){
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');
    var canvasBg = document.getElementById('texture');
    var ctxBg = gameApp.ctxBg();
    var gameDataSection = document.getElementById('gameData');
    var ctxGameData = gameDataSection.getContext('2d');
    function addText(ctx,text,x,y,size){
        return gameApp.addText(ctx,text,x,y,size);
    }
    // Переменные уровней
    var presenceTrees = true;

    /* Dynamic variables */
    var widthd = 16;
    var heightd = 27;
    var spriteXd = 385;
    var spriteYd = 149;
    var positionOnMapX = 100;
    var positionOnMapY = 140;
    /* Dynamic variables END*/

    /* move Mario data */
    var moveMan = false;
    var moveDirection;
    var spriteCount = 3;
    function marioMoveData(moveManData, moveDirectionData, spriteCountData){
        moveMan = moveManData;
        moveDirection = moveDirectionData;
        spriteCount = spriteCountData;
    }
    /* move Mario data END*/

    var treesItems = []; // Масив с данными деревьев


    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function moveItem(direction, count, spriteCount){
        // Очистка координат Марио
        ctx.clearRect(positionOnMapX,positionOnMapY,widthd,heightd);

        var i=count % spriteCount;
        switch(direction){
            case 'right':
                (function move(SpritesCount, positions){
                    spriteXd = positions[i][0];
                    spriteYd = positions[i][1];
                    if(positionOnMapX+manData.width>=ctx.canvas.width) return false;
                    positionOnMapX++
                })(spriteCount,[
                        [311,122],
                        [328,122],
                        [345,122]
                    ]);
                break;
            case 'left' :
                (function move(SpritesCount, positions){
                    spriteXd = positions[i][0];
                    spriteYd = positions[i][1];
                    if(positionOnMapX<=0) return false;
                    positionOnMapX--
                })(spriteCount,[
                        [296,122],
                        [279,122],
                        [262,122]
                    ]);
                break;
            case 'up' :
                (function move(SpritesCount, positions){
                    spriteXd = positions[i][0];
                    spriteYd = positions[i][1];
                    if(positionOnMapY<=0) return false;
                    positionOnMapY--
                })(spriteCount,[
                        [410,122],
                        [427,122]
                    ]);
                break;
            case 'down' :
                (function move(SpritesCount, positions){
                    spriteXd = positions[i][0];
                    spriteYd = positions[i][1];
                    if(positionOnMapY+manData.height>=ctx.canvas.height) return false;
                    positionOnMapY++
                })(spriteCount,[
                        [385,178],
                        [402,178]
                    ]);
                break;
            default :
                spriteXd = 385;
                spriteYd = 149;

        }

        // Если деревья включены
        if(presenceTrees){
            // Проверка на то, что Марио находится на координатах дерева
            for(var k=0; k<treesItems.length; k++){
                // Если Марио за деревом, то отрисовываем его первого
                if( treesItems[k].positionOnCanvas_Y <= manData.positionOnCanvas_Y+manData.height &&
                    treesItems[k].positionOnCanvas_Y+treesItems[k].height >= manData.positionOnCanvas_Y &&
                    treesItems[k].positionOnCanvas_X <= manData.positionOnCanvas_X+manData.width &&
                    treesItems[k].positionOnCanvas_X+treesItems[k].width >= manData.positionOnCanvas_X
                    ){
                    canvasBg.style.zIndex = 1;
                        // Если Марио находится перед деревом
                        if( manData.positionOnCanvas_Y+manData.height >= treesItems[k].positionOnCanvas_Y+treesItems[k].height ){
                            canvasBg.style.zIndex = "";
                        }
                    break;
                } else {
                    canvasBg.style.zIndex = "";
                    CreateMan(manData);
                }
            }
        } else {
            CreateMan(manData);
        }

    }

    // Отрисовка главного персонажа
    var sprite = new Image();
    sprite.src = 'images/sprite.png';
    var manData = new gameApp.ItemData(widthd, heightd, spriteXd, spriteYd, positionOnMapX, positionOnMapY);
    function CreateMan(Data){
        Data.spriteX = spriteXd;
        Data.spriteY = spriteYd;
        Data.positionOnCanvas_X = positionOnMapX;
        Data.positionOnCanvas_Y = positionOnMapY;
        ctx.drawImage(sprite, spriteXd, spriteYd, widthd, heightd, positionOnMapX, positionOnMapY, widthd, heightd);
    }

    // Отрисовка деревьев
    function createTrees(countX,countY, distanceBtwTreesX,distanceBtwTreesY){
        treesItems = [];
        for(var i=0; i<countX; i++){
            for(var k=0; k<countY; k++){
                ctxBg.drawImage(sprite, 440, 299, 66, 100, i*distanceBtwTreesX-k*20, k*distanceBtwTreesY-i*30, 66, 100);
                treesItems.push( new gameApp.ItemData(66,100, 440,299, i*distanceBtwTreesX-k*20, k*distanceBtwTreesY-i*30) );
            }
        }
    }


    // Главный цикл игры
    function loop(e){
        var loopCount = parseInt(e/150);

        // Движение и данные главного персонажа
        if(moveMan) moveItem(moveDirection, loopCount, spriteCount);
    }
    (function animationLoop(e){
        loop(e);
        requestAnimationFrame(animationLoop, canvas);
    })();



    // События
    document.onkeydown = checkKeycode;
    document.onkeyup = upKeycode;
    function checkKeycode(e) {
        var keycode;
        if (window.event) keycode = window.event.keyCode;
        else if (e) keycode = e.which;

        switch(keycode){
            case 38 :
                marioMoveData(true, 'up', 2);
                break;
            case 40 :
                marioMoveData(true, 'down', 2);
                break;
            case 37 :
                marioMoveData(true, 'left', 3);
                break;
            case 39 :
                marioMoveData(true, 'right', 3);
                break;
        }
    }
    function upKeycode(e) {
        var keycode;
        if (window.event) keycode = window.event.keyCode;
        else if (e) keycode = e.which;
        switch(keycode){
            case 38 :
                moveMan = false;
                moveItem('default', 1, 1);
                break;
            case 40 :
                moveMan = false;
                moveItem('default', 1, 1);
                break;
            case 37 :
                moveMan = false;
                moveItem('default', 1, 1);
                break;
            case 39 :
                moveMan = false;
                moveItem('default', 1, 1);
                break;
        }
    }



    // LOAD GAME
    if(presenceTrees) createTrees(6,6, 160,140);
    CreateMan(manData);


    /*******************************************
     * game dada section
     ******************************************/


    addText(ctxGameData,'Mega Mario Game',8,30,16);
    addText(ctxGameData,'Level: '+gameApp.level,8,70,13);
    addText(ctxGameData,'Score:',8,90,13);
    addText(ctxGameData,'Health:',8,110,13);
    ctxGameData.drawImage(sprite, 373, 299, 54, 47, 100, 45, 54, 47);

};
