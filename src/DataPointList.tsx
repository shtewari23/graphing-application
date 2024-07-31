import React, { useState } from 'react';
import Draggable from 'react-draggable';
const dataPoints = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 6 },
  { x: 4, y: 8 },
  { x: 5, y: 10 },
  { x: 6, y: 12 },
  { x: 7, y: 14 },
  { x: 8, y: 16 },
  { x: 9, y: 18 },
  { x: 10, y: 20 },
  { x: 11, y: 22 },
  { x: 12, y: 24 },
  { x: 13, y: 26 },
  { x: 14, y: 28 },
  { x: 15, y: 30 },
];

interface DataPointListProps {
  onDragEnd: (point: { x: number, y: number }) => void;
  
}

const DataPointList: React.FC<DataPointListProps> = ({ onDragEnd }) => {
    const [visiblePoints, setVisiblePoints] = useState(dataPoints.map(() => true));
    const handleEnd = (index: number) => {
        setVisiblePoints(visiblePoints.map((visible, i) => (i === index ? false : visible)));
      };
  return (
    <div className="data-point-list">
      {dataPoints.map((point, index) => (
        <Draggable
          key={index}
          onStart={() => onDragEnd(point)}

        onStop ={()=>handleEnd(index)}

        >
          <div className="data-point" style={{ display: visiblePoints[index] ? 'block' : 'none' }}>            ({point.x}, {point.y})
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default DataPointList;
