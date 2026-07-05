function drawMiniMap() {

    const scale = 40;

    for(let y=0; y<worldMap.length; y++){

        for(let x=0; x<worldMap[y].length; x++){

            if(worldMap[y][x]===1){
                ctx.fillStyle="#00f0ff";
            }else{
                ctx.fillStyle="#222";
            }

            ctx.fillRect(
                x*scale+20,
                y*scale+150,
                scale-2,
                scale-2
            );

        }

    }

    ctx.fillStyle="red";

    ctx.beginPath();

    ctx.arc(
        player.x*scale+20,
        player.y*scale+150,
        8,
        0,
        Math.PI*2
    );

    ctx.fill();
}
