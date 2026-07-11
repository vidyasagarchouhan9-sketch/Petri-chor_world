<!DOCTYPE html>
<html>

<head>

<title>Petri-Chor - Aurora Space Station Deck 1</title>

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

body{
    margin:0;
    background:#020617;
    overflow:hidden;
}


#game{
    width:100vw;
    height:100vh;
    overflow:auto;
}


#map{

    display:grid;
    grid-template-columns:repeat(30,50px);

}



.tile{

    width:50px;
    height:50px;

}



.wall{

    background:linear-gradient(135deg,#26344f,#101827);

    border:1px solid #00eaff;

}



.floor{

    background:linear-gradient(135deg,#071426,#0b2038);

    border:1px solid #12304d;

}



.door{

    background:linear-gradient(90deg,#00ffff,#075985);

    border:2px solid #a5f3fc;

    box-shadow:
    0 0 18px #00ffff;

}


.floor:nth-child(5n){

    box-shadow:inset 0 0 7px #00ffff;

}


</style>

</head>


<body>


<div id="game">

<div id="map"></div>

</div>



<script>


const mapData=[

"111111111111111111111111111111",

"100000000020000000000000000001",

"100011111110001111111000000001",

"100010000000001000001000000001",

"100010000000001000001000000001",

"100012000000001000001000000001",

"111110000000001000001000000001",

"100000000000002000001000000001",

"100000000000001000001000000001",

"100011111200001000001111100001",

"100010000000001000000000100001",

"100010000000002000000000100001",

"100010000111111111000000100001",

"100010000000000000000000100001",

"100012000000000000000000200001",

"111111111111111111111111111111"

];



const map=document.getElementById("map");



mapData.forEach(row=>{


row.split("").forEach(cell=>{


let tile=document.createElement("div");

tile.className="tile";


if(cell==="1"){

tile.classList.add("wall");

}

else if(cell==="2"){

tile.classList.add("door");

}

else{

tile.classList.add("floor");

}


map.appendChild(tile);


});


});


</script>


</body>

</html>
