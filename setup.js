var gameApp = {
    ctx : function(){
        var canvas = document.getElementById('game');
        return canvas.getContext('2d');
    },
    ctxBg : function(){
        var canvasBg = document.getElementById('texture');
        return canvasBg.getContext('2d');
    },
    rand : function (min, max){
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor( Math.random() * (max - min + 1)) + min;
    },
    addText : function (ctx,text,x,y,size){
        ctx.font = size+'px Verdana';
        ctx.fillStyle = "#eee";
        ctx.fillText(text,x,y, 150);
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
    },
    // Конструктор для создания сущностей
    ItemData : function (width, height, positionOnCanvas_X, positionOnCanvas_Y){
        this.width = width;
        this.height = height;
        this.positionOnCanvas_X = positionOnCanvas_X;
        this.positionOnCanvas_Y = positionOnCanvas_Y;
    },
    sprite : function(){
        var sprite = new Image();
        sprite.src = 'images/sprite.png';
        return sprite;
    },
    // game data
    gameData : {
        level : 1,
        health : 1,
        // crystals
        crystalData : [],
        maxCrystalCount : 2,
        // score
        gameScore : 0
    }
};

var gameLevels = {
    level_1 : function(){
        var maxCrystalCount = gameApp.gameData.maxCrystalCount;
        var crystalsData = gameApp.gameData.crystalData;
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
            gameApp.ctxBg().drawImage(gameApp.sprite(), crystalsPositions[crystalRand][0], 118, 13, 10, randX, randY, 16, 13);
            crystalsData.push( new gameApp.ItemData(18,15, randX,randY) );
        }
    },
    level_2 : function(){
        gameApp.gameData.maxCrystalCount = 25;
        var maxCrystalCount = gameApp.gameData.maxCrystalCount;
        var crystalsData = gameApp.gameData.crystalData;
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
            gameApp.ctxBg().drawImage(gameApp.sprite(), crystalsPositions[crystalRand][0], 118, 13, 10, randX, randY, 16, 13);
            crystalsData.push( new gameApp.ItemData(18,15, randX,randY) );
        }
    }
};