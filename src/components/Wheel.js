import React from "react";
import "./Wheel.style.css";

const spinNow = () => {
  document.getElementById("spin").click();
};

export class Wheel extends React.Component {
  state = {
    list: ["A", "B", "C", "D", "E", "F"],
    radius: 75, // PIXELS
    rotate: 0, // DEGREES
    easeOut: 0, // SECONDS
    angle: 5, // RADIANS
    top: null, // INDEX
    offset: null, // RADIANS
    net: null, // RADIANS
    result: null, // INDEX
    spinning: false,
  };

  componentDidMount() {
    // generate canvas wheel on load
    this.renderWheel();
  }

  renderWheel() {
    // determine number/size of sectors that need to created
    let numOptions = this.state.list.length;
    let arcSize = (2 * Math.PI) / numOptions;
    this.setState({
      angle: arcSize,
    });

    // get index of starting position of selector
    this.topPosition(numOptions, arcSize);

    let colors = ["#3e79d4", "white"];

    // dynamically generate sectors from state list
    let angle = 0;

    for (let i = 0; i < numOptions; i++) {
      let text = this.state.list[i];
      this.renderBorder(i + 1, text, angle, arcSize, colors[i % 2]);
      this.renderSector(i + 1, text, angle, arcSize, colors[i % 2]);
      angle += arcSize;
    }
    // this.renderCircle();
  }

  topPosition = (num, angle) => {
    // set starting index and angle offset based on list length
    // works upto 9 options
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    this.setState({
      top: topSpot - 1,
      offset: degreesOff,
    });
  };

  renderSector(index, text, start, arc, color) {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = this.state.radius;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 3.33;
    let textRadius = baseSize - 150;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = "blue";

    ctx.font = "17px Arial";
    ctx.fillStyle = "black";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );

    ctx.rotate(angle - arc / 2 + Math.PI);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();

    const image = new Image(30, 30);
    image.src =
      "https://backend.central.co.th/media/catalog/product/f/1/f1fe34e52b446c1b4011908bb4faf30ea22c7290_mkp0619878dummy.jpg";
    image.onload = () => {
      const imageWidth = 40;
      const imageHeight = 40;
      const centerX = imageWidth / 2.0;
      const centerY = imageHeight / 2.0;
      let radiusLengthX = Math.cos(angle - arc / 2) * textRadius;
      let radiusLengthY = Math.sin(angle - arc / 2) * textRadius;

      ctx.save(); //saves the state of canvas
      ctx.translate(x + radiusLengthX, y + radiusLengthY);
      ctx.rotate(angle - arc / 2 + Math.PI);
      ctx.translate(-centerX, -centerY);
      ctx.drawImage(image, 0, 0, imageWidth, imageHeight); //draw the image ;)
      ctx.restore(); //restore the state of canvas
    };
  }
  renderBorder(index, text, start, arc, color) {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = this.state.radius;
    let startAngle = start;
    let endAngle = start + arc;
    let halfAngle = start + arc / 2;
    let dotX = x + radius * 2.12 * Math.cos(halfAngle);
    let dotY = y + radius * 2.12 * Math.sin(halfAngle);

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2.5;
    ctx.strokeStyle = "orange";
    ctx.stroke();

    ctx.beginPath();
    // ctx.arc(x, y, 10, 0, Math.PI * 2, true);
    // ctx.stroke();

    ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.restore();
  }
  renderCircle() {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;

    ctx.beginPath();
    var radius = 20; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI + (Math.PI * 2) / 2; // End point on circle

    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.fillStyle = "yellow";

    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.font = "20px serif";
    ctx.fillStyle = "#000000";
    ctx.fillText("กด!", x - 16, y + 16 / 2);

    ctx.fill();
  }

  getColor() {
    // randomly generate rbg values for wheel sectors
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  }

  spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    let randomSpin = Math.floor(Math.random() * 900) + 500;
    this.setState({
      rotate: randomSpin,
      easeOut: 2,
      spinning: true,
    });

    // calcalute result after wheel stops spinning
    setTimeout(() => {
      this.getResult(randomSpin);
    }, 2000);
  };

  getResult = (spin) => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state list
    const { angle, top, offset, list } = this.state;
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = list.length + count;
    }

    // set state variable to display result
    this.setState({
      net: netRotation,
      result: result,
    });
  };

  reset = () => {
    // reset wheel and result
    this.setState({
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false,
    });
  };

  render() {
    return (
      <div className="relative w-4/6 h-4/6 flex justify-center items-center">
        <span id="selector">&#9660;</span>
        <canvas
          id="wheel"
          width="500"
          height="500"
          style={{
            WebkitTransform: `rotate(${this.state.rotate}deg)`,
            WebkitTransition: `-webkit-transform ${this.state.easeOut}s ease-out`,
          }}
        />
        <button
          onClick={() => spinNow()}
          className="absolute rounded-full bg-yellow-400 p-2"
        >
          กด!
        </button>

        {this.state.spinning ? (
          <button
            style={{ display: "none" }}
            type="button"
            id="spin"
            onClick={this.reset}
          >
            reset
          </button>
        ) : (
          <button
            style={{ display: "none" }}
            type="button"
            id="spin"
            onClick={this.spin}
          >
            spin
          </button>
        )}
        {/* <div class="display">
          <span id="readout">
            YOU WON:{"  "}
            <span id="result">{this.state.list[this.state.result]}</span>
          </span>
        </div> */}
      </div>
    );
  }
}
