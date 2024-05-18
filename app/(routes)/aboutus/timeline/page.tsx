import { Chrono } from "react-chrono";

const Timeline = () => {
  const items = [{
    title: "Title 1",
    cardTitle: "Card Title 1",
    // Other properties...
  },
  // ...more items
  ];

  return (
    <div style={{ width: '500px', height: '950px' }}>
      <Chrono items={items} mode="VERTICAL" />
    </div>
  );
};

export default Timeline;