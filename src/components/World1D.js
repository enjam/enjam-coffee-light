import LightBall from './LightBall';
import {sanitizeColor} from './helperFunctions';

const g = 100;

class World1D {
  balls = [];

  constructor({size, onBallKill}){
    this.view = Array.from(Array(size)).map(() => [0, 0, 0]);
    this.size = size;
    this.onBallKill = onBallKill;
  }

  clearView = () => {
    this.view.forEach(c => {
      c[0] = 0;
      c[1] = 0;
      c[2] = 0;
    });
  }

  step = dt => {
    this.balls.forEach(ball => {
      ball.pos += ball.vel * dt;
      ball.vel -= g * dt;
      if (ball.pos <= 0 && ball.vel <= 0){
        const bounceCount = ball.bounceCount || 0;
        if (bounceCount === 1){
          if (ball.pos <= - ball.size / 2){
            ball.markForRemoval = true;
            this.onBallKill(ball);
          }
        }else{
          ball.bounceCount = bounceCount + 1;
          ball.vel *= -.7;
        }
      }
    });
    this.balls = this.balls.filter(ball => !ball.markForRemoval);
    const v = this.view;
    this.clearView();
    this.balls.forEach(ball => {
      const {size, pos, color} = ball;
      const top = Math.min(Math.floor(pos + size/2), v.length - 1);
      const bottom = Math.max(Math.ceil(pos - size/2), 0);
      for (let i = bottom; i <= top; i++) {
        const d = Math.abs(i - pos);
        const nd = 2 * d / size;
        const alpha = 1 - nd; //fade function
        const c = v[i];
        c[0] += color[0] * alpha; // blend mode r, g, b
        c[1] += color[1] * alpha;
        c[2] += color[2] * alpha;
      }
    });
    this.view.forEach(sanitizeColor);
  }

  addBall = (ballOptions) => {
    this.balls.push(new LightBall(ballOptions));
    console.log(this.balls);
  }
}

export default World1D;
