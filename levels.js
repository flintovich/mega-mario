
/*window.addEventListener("load", function(){
    var ctxBg = gameApp.ctxBg();

    /* level 1 - Найти все кристалы *//*
    function level_1(){

    }
    function level_2(){
        gameApp.gameData.maxCrystalCount = 10;
        var maxCrystalCount = gameApp.gameData.maxCrystalCount;
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
            ctxBg.drawImage(sprite, crystalsPositions[crystalRand][0], 118, 13, 10, randX, randY, 16, 13);
            gameApp.gameData.crystalData.push( new gameApp.ItemData(18,15, randX,randY) );
        }
    }

    switch (gameApp.gameData.level){
        case 1 :
            level_1();
            break;
        case 2 :
            level_2();
            break;
    }

}, false);*/