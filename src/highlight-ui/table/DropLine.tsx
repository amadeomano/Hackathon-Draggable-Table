import { useDragLayer } from "react-dnd";
import { useAreas } from "./hooks";

const DropLine = () => {
  const { isDragging, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset()
  }));

  const areas = useAreas();

  const left = areas.reduce(
    (acc, curr) =>
      currentOffset?.x >= curr.start && currentOffset?.x < curr.end
        ? curr.end
        : acc,
    areas[0]?.end
  );

  return (
    <div
      style={{
        position: "absolute",
        width: 2,
        transform: `translate(${left - areas[0]?.start}px, 0)`,
        top: 40,
        bottom: 0,
        backgroundColor: "#0db5df",
        transition: "all 0.2s",
        opacity: isDragging ? 1 : 0
      }}
    />
  );
};

export default DropLine;
