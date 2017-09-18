import React, { Component } from 'react';
import './Lights.css';
import {toRgbaText} from './helperFunctions';

const Light = ({color}) => {
  return (
    <div
      className="Light"
      style={{
        backgroundColor: toRgbaText(color, 1),
        boxShadow:
          `0 0 1px 1px ${toRgbaText(color, 1)},
          0 0 5px 5px ${toRgbaText(color, .2)},
          0 0 10px 10px ${toRgbaText(color, .1)}`,
      }}
    >
    </div>
  );
};

class Lights extends Component {
  render() {
    return (
      <div className="Lights">
        {
          this.props.lightArray.map((color, i) => (
            <Light key={i} color={color} />
          ))
        }
      </div>
    );
  }
}

export default Lights;
