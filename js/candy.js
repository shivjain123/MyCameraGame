class Candy {
    constructor(x, y, r) {
      var options = {
           isStatic : true,
          'restitution': 0,
          'friction': 0,
      }

      this.x = x
      this.y = y
      this.r = r
      this.body = Bodies.circle(this.x, this.y, this.r, options);
      //this.Matter.body = Matter.bodies.circle(this.x, this.y, this.r*2, options)
      this.image = loadImage("images/lollipop.jpg");
      World.add(world, this.body);

    }

    display() {

    var candyPos = this.body.position;

     push();

     translate(candyPos.x, candyPos.y);
     imageMode(CENTER)
     strokeWeight(4)
     stroke("blue")
     fill("white")
     //ellipse(0, 0, this.r, this.r);
     image(this.x, this.y, this.r, this.r);

     pop();

    }

  };
