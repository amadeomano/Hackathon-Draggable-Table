import React, { useRef, FC, useEffect } from "react";
import mapValues from "lodash/fp/mapValues";
import { parseMetadata } from "@highlight-ui/utils-commons";
import { useDrop, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import {
  DraggedItem,
  TableCellRenderer,
  TableRowRenderer,
  TableHeadCellProps
} from "./types";

export const Th: FC<TableHeadCellProps> = (props) => {
  /* eslint-disable-next-line */
  const ref = useRef();
  const { column, idx, metadata, reorder, onDragStatusChange } = props;

  /* eslint-disable-next-line */
  const [, drop] = useDrop({
    accept: "column",
    drop: (item: DraggedItem) => {
      reorder(item, idx);
    }
  });

  /* eslint-disable-next-line */
  const [{ isDragging }, drag, preview] = useDrag({
    type: "column",
    item: {
      id: column.key,
      idx,
      label: column.label
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  useEffect(() => {
    onDragStatusChange(isDragging ? idx : undefined);
  }, [isDragging, onDragStatusChange, idx]);

  return (
    <th
      ref={ref}
      key={column.key}
      style={{
        opacity: isDragging ? 0.2 : 1
      }}
      {...parseMetadata(mapValues((x) => `${x}-headCell`, metadata))}
    >
      {column.label}
    </th>
  );
};

export const renderTd: TableCellRenderer = (props) => {
  const { column, content, metadata, isDragged } = props;
  return (
    <td
      key={column.key}
      style={{ opacity: isDragged ? 0.2 : 1 }}
      {...parseMetadata(mapValues((x) => `${x}-cell`, metadata))}
    >
      {content}
    </td>
  );
};

export const renderTr: TableRowRenderer = (props) => {
  const { children, rowIndex, metadata } = props;
  return (
    <tr
      key={rowIndex}
      {...parseMetadata(mapValues((x) => `${x}-row`, metadata))}
    >
      {children}
    </tr>
  );
};
