import { useDragLayer } from "react-dnd";
import "./Preview.css";

const Preview = () => {
  const { isDragging, item, currentOffset, initialOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    })
  );

  return (
    <div
      className="preview"
      style={{
        transform: `translate(${currentOffset?.x}px, ${
          initialOffset?.y - 33
        }px)`
      }}
    >
      <div
        className="title"
        style={{
          transform: `translate(0, ${isDragging ? 0 : 30}px)`,
          opacity: isDragging ? 1 : 0
        }}
      >
        {item?.label}
      </div>
      <div
        className="shadow"
        style={{
          opacity: isDragging ? 1 : 0
        }}
      />
    </div>
  );
};

export default Preview;
