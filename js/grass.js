class Grass {
    constructor(x, y, width, height) {
      var options = {
           isStatic : true,
          'restitution': 0,
          'friction': 0.1,
      }

      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.body = Bodies.rectangle(x, y, width, height, options);
      //this.Matter.body = Matter.bodies.circle(this.x, this.y, this.r*2, options)
      this.image = grass1 = loadImage("images/grass1.jpg");
      this.image = grass2 = loadImage("images/grass2.jpg");
      this.image = grass3 = loadImage("images/grass3.jpg");
      this.image = grass4 = loadImage("images/grass4.jpg");
      World.add(world, this.body);

    }

    display() {

    //generate random rocks
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        grass.addImage(grass1);
        break;
      case 2:
        grass.addImage(grass2);
        break;
      case 3:
        grass.addImage(grass3);
        break;
      case 4:
        grass.addImage(grass4);
      default:
        break;
    }

    var groundPos = this.body.position;

     push();

     translate(groundPos.x, groundPos.y);
     imageMode(CENTER)
     strokeWeight(4)
     stroke("blue")
     fill("white")
     image(this.x, this.y, this.width, this.height);

     pop();

    }

  };
