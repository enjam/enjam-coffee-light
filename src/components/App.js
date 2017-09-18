import React, { Component } from 'react';
import './App.css';

import Lights from './Lights';
import LightButtons from './LightButtons';
import World1D from './World1D';
import ColorKeeper from './ColorKeeper';

const randVal = () => Math.floor(Math.random() * 256);
const arr = size => Array.from(Array(size));
const randColor = () => arr(3).map(randVal);
const randLightArray = size => arr(size).map(randColor);
const randRange = (min, max) => Math.random() * (max - min) + min;
const emptyView = size => arr(size).map(() => [0,0,0]);

const middleTopOffset = 3;

class App extends Component {
  constructor(){
    super();
    this.leftWorld = new World1D({
      size: 62 + middleTopOffset,
      onBallKill: this.onLeftBallKill
    });
    this.rightWorld = new World1D({
      size: 62 + middleTopOffset,
      onBallKill: this.onRightBallKill
    });
    this.leftColorKeeper = new ColorKeeper({size: 18});
    this.rightColorKeeper = new ColorKeeper({size: 18});
    this.state = {
      leftTopLights: emptyView(52),
      leftMiddleLights: emptyView(10),
      leftTableLights: emptyView(18),
      rightTopLights: emptyView(52),
      rightMiddleLights: emptyView(10),
      rightTableLights: emptyView(18),
    };
  }

  componentDidMount() {
    const timestamp = window.performance.now();
    this.lastTimestamp = timestamp;
    this.loop(timestamp);
    this.intervalId = window.setInterval(
      () => this.addBall(randColor())
      , 250
    );
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.reqAnimId);
    window.cancelInterval(this.intervalId);
  }

  onLeftBallKill = ball => this.leftColorKeeper.addColor(ball.color);
  onRightBallKill = ball => this.rightColorKeeper.addColor(ball.color);

  addBall = color => {
    const world = Math.random() < .5 ? this.leftWorld : this.rightWorld;
    world.addBall({
      size: randRange(3, 10),
      color,
      vel: randRange(70, 110),
      pos: -5,
    });
  }

  onButtonClick = color => {
    arr(10).forEach(() => this.addBall(color));
  }

  loop = timestamp => {
    const dt = (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;
    this.leftWorld.step(dt);
    this.rightWorld.step(dt);
    this.setState({
      leftTopLights: this.leftWorld.view.slice(10 + middleTopOffset, 52),
      leftMiddleLights: this.leftWorld.view.slice(0, 10),
      leftTableLights: this.leftColorKeeper.view,
      rightTopLights: this.rightWorld.view.slice(10 + middleTopOffset, 52),
      rightMiddleLights: this.rightWorld.view.slice(0, 10),
      rightTableLights: this.rightColorKeeper.view,
    })
    this.reqAnimId = window.requestAnimationFrame(this.loop);
  }

  render() {
    return (
      <div className="App">
        <div className="LightBox">
          <div className="LightsRow">
            <Lights lightArray={this.state.leftTopLights} />
            <div>High lights</div>
            <Lights lightArray={this.state.rightTopLights} />
          </div>
          <div className="LightsRow MiddleRow">
            <Lights lightArray={this.state.leftMiddleLights} />
            <div>Low lights</div>
            <Lights lightArray={this.state.rightMiddleLights} />
          </div>
          <div className="LightsRow TableRow">
            <Lights lightArray={this.state.leftTableLights} />
            <div>Table lights</div>
            <Lights lightArray={this.state.rightTableLights} />
          </div>
          <LightButtons onClickCallback={this.onButtonClick}/>
        </div>
      </div>
    );
  }
}

export default App;
