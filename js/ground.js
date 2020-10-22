class Ground {
    constructor(x, y, width, height) {
      var options = {
          isStatic: true
      }
      this.body = Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.image = loadImage("images/ground.jpg");
      World.add(world, this.body);
    }
    display(){
      var groundPos = this.body.position;

      rectMode(CENTER);
      translate(groundPos.x, groundPos.y);
      fill("brown");
      rect(groundPos.x, groundPos.y, this.width, this.height);
    }
  };
