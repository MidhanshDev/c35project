class Food{
constructor(){
    this.foodStock = 0;
    this.lastFed = null;
    this.image = loadImage("images/Milk.png")
}
getFoodStock(){
   /* database.ref('Food').on("value",(data)=>{
        this.foodStock = data.val();
    });*/
    return this.foodStock;
}

updateFoodStock(foodStock){
    this.foodStock = foodStock;
}

detuctFood(){
    if(this.foodStock>0){
        this.foodStock-=1;
    }
}

getFedTime(lastFed){
    this.lastFed= lastFed;
}
display(){
var x=80,y=100;

    imageMode(CENTER);
    image(this.image,720,220,70,70);

    if(this.foodStock!=0){
    for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
            x = 80;
            y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30
      }
    }

}
}