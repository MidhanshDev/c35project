//Create variables here
var dog,Happydog,database,foodS,foodStock
var dogImage;
var milkBottle,milkImage;
var button1,button2;
var fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  Happydog = loadImage("images/dogImg1.png");
  milkImage = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(200,260);
  dog.scale = 0.3;
  dog.addImage(dogImage);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(Happydog)
  }

  drawSprites();
  foodObj.display();
  //add styles here
  text("food remaining; "+foodS,120,150);
  text("NOTE:Press UP_ARROW key to feed bruno milk!",120,50);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30);
  }else{
      text("Last Feed : "+lastFed + " AM",350,30);
  }
  
  


}
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
  function addFoods(){
    foodS++;
    database.ref('/').update({
    Food:foodS

    })
  }

function writeStock(x){
  if(x>0){
    x = x-1;
  }
  else{
    x = 0;
  }
  database.ref('/').update({
    Food:x
  })
}



