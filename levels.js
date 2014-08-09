window.addEventListener("load", function(){
    var ctxBg = gameApp.ctxBg();
    var ctxGameData = gameApp.ctxGameData();
    var sprite = new Image();
    sprite.src = 'images/sprite.png';
    function addText(ctx,text,x,y,size){
        return gameApp.addText(ctx,text,x,y,size);
    }

    /* level 1 - Найти все кристалы */
    function level_1(){
        var maxCrystalCount = 30;
        var crystalsPositions = [
            [163, 118],
            [146, 118],
            [129, 118],
            [112, 118],
            [95, 118],
            [78, 118]
        ];
        for(var i=0; i<maxCrystalCount; i++){
            var randX = gameApp.rand(10,750);
            var randY = gameApp.rand(10,550);
            var crystalRand = gameApp.rand(0,crystalsPositions.length-1);
            ctxBg.drawImage(sprite, crystalsPositions[crystalRand][0], 118, 13, 10, randX, randY, 18, 15);
        }

        addText(ctxGameData,'Crystals: '+maxCrystalCount,8,130,13);
    }




    level_1();

}, false);