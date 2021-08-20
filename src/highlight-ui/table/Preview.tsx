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

  return isDragging ? (
    <div
      className="preview"
      style={{
        transform: `translate(${currentOffset?.x}px, ${
          initialOffset?.y - 33
        }px)`
      }}
    >
      {item.label}
    </div>
  ) : null;
};

export default Preview;
