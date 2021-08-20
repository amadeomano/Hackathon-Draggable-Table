import { useDragLayer } from "react-dnd";

const DropLine = () => {
  const { isDragging, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset()
  }));

  const areas = [...document.querySelectorAll("table th")]
    .map((n) => n.getBoundingClientRect())
    .map(({ x, width }) => ({ start: x, end: x + width }));

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
        left,
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
