

var gamestate = "play"
var END=0;
var gameState=1;
var treasureCollection = 0;
var coingroup , dangergroup

function preload() {
	
	background2img  = loadImage("background2.png")
	coinImg = loadImage("coin.png")
	monImg = loadImage("mon.png")
	dangerImg = loadImage("danger.png")
    go = loadImage("go.png")
	bcImg = loadImage(" background2.png");
}
function setup() { 
    createCanvas(500, 600);
    cs = createSprite(250 ,200 , 0 , 0);
	cs.addImage(bcImg)
	cs.velocityY = 7;

	mon = createSprite(250  , 500, 50 , 50);
	mon.addImage(monImg)
    mon.scale = 0.5

	wall1 = createSprite(92,410,60,200);
	wall2 = createSprite(400,410,60,200);
 
	coingroup = createGroup();
	dangergroup = createGroup();

	go1 = createSprite(260 ,270 , 0 , 0);
    go1.addImage(go)
    go1.visible = false
    go1.scale = 1.3
	
	score = 0;
}

function draw() {
	background("grey")

	if(gamestate === "play") {

		if(keyDown("left_arrow")){
			mon.x = mon.x - 7
		}
		
		if(keyDown("right_arrow")){
			mon.x = mon.x + 7
		}
		
		if(cs.y > 400) {
			cs.y = 220 
		}
        
		//cheat code press (p) for extra 100 in treasure
		 if(keyDown("p")){
		 treasureCollection=treasureCollection+100;
		 }

		spawncoin();
		spawndanger();

		mon.collide(wall1);
		mon.collide(wall2);
		
		wall1.visible = false
		wall2.visible = false

		if(mon.isTouching(dangergroup)) {
			gameState = "end";
			dangergroup.destroyEach();
		}

		if(mon.isTouching(coingroup)) {
			coingroup.destroyEach();
			treasureCollection=treasureCollection+50;
		}

	} 
	
	if (gameState === "end") {
		coingroup.destroyEach()    
		dangergroup.destroyEach()
		cs.velocityY = 0
		go1.visible = true

		if(keyDown("r")) {
			reset();
			treasureCollection = 0
		  }
      
	}
	drawSprites();
	textSize(20)
	fill("red")
	text("Treasure =  " +  treasureCollection , 190 , 90   )
}
   
function spawncoin() {
	if (frameCount % 170 === 0) {
		var coin = createSprite(Math.round(random(250, 200),40, 10, 10))
		coin.addImage(coinImg)
		coin.scale=0.12
		coin.velocityY = 3
		coin.lifetime = 200
        coingroup.add(coin)
	}
  }
  function spawndanger() {
	if (frameCount % 200 === 0) {
		var danger = createSprite(Math.round(random(250, 200),40, 10, 10))
		danger.addImage(dangerImg)
		danger.scale=0.12
		danger.velocityY = 3
		danger.lifetime = 200
		dangergroup.add(danger)
		}
}

function reset(){
	gameState = "play";
	go1.visible = false
	cs.velocityY = 7;
	
  }
  
