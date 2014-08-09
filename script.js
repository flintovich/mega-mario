window.onload = function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

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
    var beforeTrees = false;

    window.requestAnimFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    // Конструктор для создания сущностей
    function ItemData(width, height, spriteX, spriteY, positionOnCanvas_X, positionOnCanvas_Y){
        this.width = width;
        this.height = height;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.positionOnCanvas_X = positionOnCanvas_X;
        this.positionOnCanvas_Y = positionOnCanvas_Y;
    }

    function moveItem(direction, count, spriteCount){
        // Очистка координат Марио
        ctx.clearRect(positionOnMapX,positionOnMapY,widthd,heightd);

        var i=count % spriteCount;
        switch(direction){
            case 'right':
                (function move(SpritesCount, positions){
                    spriteXd = positions[i][0];
                    spriteYd = positions[i][1];
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
                    positionOnMapY++
                })(spriteCount,[
                        [385,178],
                        [402,178]
                    ]);
                break;
        }

        // Проверка на то, что Марио находится на координатах дерева
        for(var k=0; k<treesItems.length; k++){
            // Если Марио за деревом, то отрисовываем его первого
            if( treesItems[k].positionOnCanvas_Y <= manData.positionOnCanvas_Y+manData.height &&
                treesItems[k].positionOnCanvas_Y+treesItems[k].height >= manData.positionOnCanvas_Y &&
                treesItems[k].positionOnCanvas_X <= manData.positionOnCanvas_X+manData.width &&
                treesItems[k].positionOnCanvas_X+treesItems[k].width >= manData.positionOnCanvas_X
                ){
                // Если Марио находится перед деревом
                if( manData.positionOnCanvas_Y+manData.height >= treesItems[k].positionOnCanvas_Y+treesItems[k].height ){
                    createTrees(6,5, 160,140);
                    CreateMan(manData);
                } else {
                    CreateMan(manData);
                    createTrees(6,5, 160,140);
                }
                break;
            } else {
                CreateMan(manData);
            }
        }

    }

    // Отрисовка главного персонажа
    var sprite = new Image();
    sprite.src = 'images/sprite.png';
    var manData = new ItemData(widthd, heightd, spriteXd, spriteYd, positionOnMapX, positionOnMapY);
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
                ctx.drawImage(sprite, 440, 299, 66, 100, i*distanceBtwTreesX-k*20, k*distanceBtwTreesY-i*30, 66, 100);
                treesItems.push( new ItemData(66,100, 440,299, i*distanceBtwTreesX-k*20,k*distanceBtwTreesY-i*30) );
            }
        }
    }

    // LOAD
    createTrees(6,5, 160,140);
    CreateMan(manData);

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
                spriteXd = 385;
                spriteYd = 149;
                break;
            case 40 :
                moveMan = false;
                spriteXd = 385;
                spriteYd = 149;
                break;
            case 37 :
                moveMan = false;
                spriteXd = 385;
                spriteYd = 149;
                break;
            case 39 :
                moveMan = false;
                spriteXd = 385;
                spriteYd = 149;
                break;
        }
    }

};
