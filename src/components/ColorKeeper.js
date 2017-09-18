class ColorKeeper {
  constructor({size}){
    this.size = size;
    this.view = Array.from(Array(size)).map(() => [0,0,0]);
  }

  addColor(color){
    this.view = [
      ...this.view.splice(1),
      color
    ];
  }
}

export default ColorKeeper;
