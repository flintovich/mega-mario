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
    ItemData : function (width, height, spriteX, spriteY, positionOnCanvas_X, positionOnCanvas_Y){
        this.width = width;
        this.height = height;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.positionOnCanvas_X = positionOnCanvas_X;
        this.positionOnCanvas_Y = positionOnCanvas_Y;
    },
    ctxBg : function(){
        var canvasBg = document.getElementById('texture');
        return canvasBg.getContext('2d');
    },
    ctxGameData : function(){
        var gameDataSection = document.getElementById('gameData');
        return gameDataSection.getContext('2d');
    },
    level : 1
};