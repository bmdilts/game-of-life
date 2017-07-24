import React, { Component } from 'react';
import './App.css';

const get = (table, y, x) => (table[y] || [])[x];

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      grid: Array(10).fill().map(() => new Array(10).fill(false))
    }
    console.table(this.state.grid);
  }
  onCheck = (y,x) => event => {
    const {grid} = this.state;
    const grid2 = JSON.parse(JSON.stringify(grid));
    grid2[y][x] = event.target.checked;
    this.setState({grid: grid2});
  }
  updateCell = (grid,y,x) => {
    const cell = grid[y][x];
    const neighbors = [
      get(grid, y-1, x-1), get(grid, y-1, x), get(grid, y-1, x+1),
      get(grid, y, x-1), get(grid, y, x+1),
      get(grid, y+1, x-1), get(grid, y+1, x), get(grid, y+1,x+1)
    ].filter(x => x).length;
    if(cell){
      if(neighbors < 2){
        return false;
      }else if(neighbors > 3){
        return false;
      }else if(neighbors === 2 || neighbors === 3){
        return true;
      }
    }else{
      if(neighbors === 3){
        return true;
      }
    }
  }
  step = () => {
    const {grid} = this.state;
    const grid2 = JSON.parse(JSON.stringify(grid));
    grid.forEach((row, y) =>
      row.forEach((cell, x) =>
        grid2[y][x] = this.updateCell(grid,y,x)));
    this.setState({grid: grid2});
  }
  play = event => {
    setInterval(this.step, 500);
  }
  // THIS IS NOT WORKING... HARD MODE... IF YOU WANT A PAUSE BUTTON, MAKE IT!
  // pause = event => {
  //   const play = this.play;
  //   clearInterval(play);
  // }

  render() {
    const {grid} = this.state;
    return (
      <div>
        <h1>Game of Life</h1>
        {grid.map((row, y) =>
          <div key={y} className="row">
            {row.map((cell, x) =>
              <input key={x} type="checkbox" onChange={this.onCheck(y,x)} checked={cell || false} className="cell"/>
            )}
          </div>
        )}
        <button onClick={this.play}>{">"}</button>
        <button onClick={this.pause}>{"||"}</button>
      </div>
    );
  }
}
