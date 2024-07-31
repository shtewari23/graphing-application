import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, BarChart, Bar } from 'recharts';

interface GraphCanvasProps {
  data: { id: number, x: number, y: number }[];
  graphType: string;
  onEditPoint: (id: number, newX: number, newY: number) => void;
  onDeletePoint: (id: number) => void;
}

const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`x: ${dataPoint.x}`}</p>
        <p>{`y: ${dataPoint.y}`}</p>
      </div>
    );
  }
  return null;
};

const GraphCanvas: React.FC<GraphCanvasProps> = ({ data, graphType, onEditPoint, onDeletePoint }) => {
  const renderGraph = () => {
    switch (graphType) {
      case 'line':
        return (
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
          </LineChart>
        );
      case 'scatter':
        return (
          <ScatterChart width={600} height={300}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Scatter name="Points" data={data} fill="#8884d8" />
          </ScatterChart>
        );
      case 'bar':
        return (
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" />
            <YAxis type="number" dataKey="y" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="y" fill="#8884d8" />
          </BarChart>
        );
      default:
        return null;
    }
  };

  const handleEdit = (id: number) => {
    const newX = parseFloat(prompt("Enter new X value") || "0");
    const newY = parseFloat(prompt("Enter new Y value") || "0");
    onEditPoint(id, newX, newY);
  };

  const handleDelete = (id: number) => {
    onDeletePoint(id);
  };

  return (
    <div className="graph-canvas">
      {renderGraph()}
      <div className="data-point-controls">
        {data.map(point => (
          <div key={point.id} className="data-point-control-cursor">
            <span style={{ color: 'white' }}>({point.x}, {point.y})</span>
            <button onClick={() => handleEdit(point.id)} >Edit</button>
            <button onClick={() => handleDelete(point.id)} >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphCanvas;
