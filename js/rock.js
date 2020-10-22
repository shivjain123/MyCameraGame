class Rock {
    constructor(x, y, r) {
      var options = {
           isStatic : true,
          'restitution': 0,
          'friction': 0.1,
      }

      this.x = x
      this.y = y
      this.r = r
      this.body = Bodies.circle(this.x, this.y, this.r, options);
      //this.Matter.body = Matter.bodies.circle(this.x, this.y, this.r*2, options)
      this.image = rock1 = loadImage("images/rock1.jpg");
      this.image = rock2 = loadImage("images/rock2.jpg");
      this.image = rock3 = loadImage("images/rock3.jpg");
      World.add(world, this.body);

    }

    display() {

    //generate random rocks
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        rock.addImage(rock1);
        break;
      case 2:
        rock.addImage(rock2);
        break;
      case 3:
        rock.addImage(rock3);
        break;
      default:
        break;
    }

    var rockPos = this.body.position;

     push();

     translate(rockPos.x, rockPos.y);
     imageMode(CENTER)
     strokeWeight(4)
     stroke("blue")
     fill("white")
     //ellipse(0, 0, this.r, this.r);

     pop();

    }

  };
