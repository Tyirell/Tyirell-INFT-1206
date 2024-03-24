// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Reference Variable
//Selects the paragraph in the HTML document and allows editing of the text
const paragraph = document.querySelector("p")




//Sets the cavas width and height
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Shape Class

class Shape {
  //Defines constructors in shape class
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

//Class for the ball
class Ball extends Shape {
  constructor(x, y, velX, velY, color ,size, exists) {
    super(x, y, velX, velY)
    this.color = color;
    this.size = size;
    this.exists = true

  }
  //Allows the ball to draw itself on the screen
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 *Math.PI);
    ctx.fill();
  }
  // Updates each ball to so they can move around the screen
  update() {
    if((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0) {
      this.velY = -(this.velY)
    }

    this.x += this.velX
    this.y += this.velY

  }
  //Detects if any of the balls have collided
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx*dx + dy * dy);

        if(distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }

  }

  
}
//Creates a class for the "evil" or enemy ball
class EvilCircle extends Shape{
  constructor(x, y){
    super(x, y, 20, 20);

    this.color = "white"
    this.size = 10
    //Adds key functionality for your evil enemy so you can move him around
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      } 
    });
  }
  //Draws the evil enemy
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 *Math.PI);
    ctx.stroke();
  }
  //Checks if the evil enemy is going out of bounds(off the screen)
  checkBounds() {
    if((this.x + this.size) >= width) {
      this.x = -(this.size);
    }

    if ((this.x - this.size) <= 0) {
      this.x = -(this.size);
    }

    if((this.y + this.size) >= height) {
      this.y = -(this.size);
    }

    if((this.y - this.size) <= 0) {
      this.y = -(this.size)
    }

  }
  //Detects if the evil ball has collided with anyone
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists == true) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx*dx + dy * dy);

        if(distance < this.size + ball.size) {
          // ball.color = this.color = randomRGB();
          ball.exists = false
          //Removes one from the good guys counter depending on if they collided with the evil enemy
          goodguys = goodguys - 1
          //Displays the current goodguys count
          paragraph.textContent = `Ball count${goodguys}`
        }
      }
    }

  }




}

//Testing the ball
const testBall = new Ball(50, 100, 4, 4, "blue", 10)
testBall.x
testBall.size
testBall.color
testBall.draw();




//Setting up how mnay balls can appear on the screen and the boundaries they have to follow to stay inside the rectangle
const balls = []

while(balls.length < 25) {
  const size = random(10 , 20)
  const ball = new Ball( 
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7,),
    random(-7, 7),
    randomRGB(),
    size,
  );

  balls.push(ball)
  goodguys = goodguys + 1
}

// A loop that updates each ball, draws them and detects if any of them have collided
evilEnemy = new EvilCircle(random(0,width),random(0,height))
function loop() {
  ctx.fillStyle = 'rgb(0 0 0 / 25%)'
  //Generates random evil enemies for the min width to the max and the min height to the max height
  

  ctx.fillRect(0, 0, width, height);
  //Loops throught the list of 25 balls and creates, updates and collision detects for each of them
  for(const ball of balls) {
    if(ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    
  }
  }
  //Draws the enemy ball once since there is only one enemy during the bouncing balls game
  evilEnemy.draw()
  evilEnemy.checkBounds()
  evilEnemy.collisionDetect()

  requestAnimationFrame(loop);
}


//Rund the entire code
loop();