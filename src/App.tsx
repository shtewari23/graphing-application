import React, { useState } from 'react';
import DataPointList from './DataPointList';
import GraphCanvas from './GraphCanvas';
import './index.css';

const App: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<{ id: number, x: number, y: number }[]>([]);
  const [graphType, setGraphType] = useState<string>('line');


  const handleDragEnd = (point: { x: number, y: number }) => {
    const newPoint = { id: dataPoints.length + 1, ...point };
    setDataPoints(prevPoints => [...prevPoints, newPoint]);
    console.log("a")
  };

  const handleGraphTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGraphType(event.target.value);
  };

  const handleEditPoint = (id: number, newX: number, newY: number) => {
    setDataPoints(prevPoints => prevPoints.map(point =>
      point.id === id ? { ...point, x: newX, y: newY } : point
    ));
  };

  const handleDeletePoint = (id: number) => {
    setDataPoints(prevPoints => prevPoints.filter(point => point.id !== id));
  };

  return (
    <div className="app">
      <h1 style={{ color: 'white' }}>Graphing Application</h1>
      <div className="controls">
        <label htmlFor="graphType" style={{ marginTop: '12px', fontSize: '24px' ,marginRight:'100px' }}>Graph Type:</label>
        <select id="graphType" value={graphType} onChange={handleGraphTypeChange} style={{ position: 'absolute', marginLeft: '15%', marginTop: '11px' ,marginRight:'70px'}}>
          <option value="line">Line</option>
          <option value="scatter">Scatter</option>
          <option value="bar">Bar</option>
        </select>
      </div>
      <div className="main">
        <DataPointList onDragEnd={handleDragEnd} />
        <GraphCanvas data={dataPoints} graphType={graphType} onEditPoint={handleEditPoint} onDeletePoint={handleDeletePoint} />
      </div>
    </div>
  );
};

export default App;
