var gameApp = {
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
    ctx : function(){
        var canvas = document.getElementById('game');
        return canvas.getContext('2d');
    },
    ctxBg : function(){
        var canvasBg = document.getElementById('texture');
        return canvasBg.getContext('2d');
    },
    ctxGameData : function(){
        var gameDataSection = document.getElementById('gameData');
        return gameDataSection.getContext('2d');
    },
    level : 1,
    // crystals
    crystalData : [],
    maxCrystalCount : 20,

    // score
    gameScore : 0

};