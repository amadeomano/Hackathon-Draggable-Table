import React, { useRef, FC } from "react";
import mapValues from "lodash/fp/mapValues";
import { parseMetadata } from "@highlight-ui/utils-commons";
import { useDrop, useDrag } from "react-dnd";
import {
  DraggedItem,
  TableCellRenderer,
  TableRowRenderer,
  TableHeadCellProps
} from "./types";

export const Th: FC<TableHeadCellProps> = (props) => {
  /* eslint-disable-next-line */
  const ref = useRef();
  const { column, idx, metadata, reorder } = props;

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
    item: () => {
      return {
        id: column.key,
        idx
      } as DraggedItem;
    }
  });

  drag(drop(ref));

  return (
    <th
      ref={ref}
      key={column.key}
      {...parseMetadata(mapValues((x) => `${x}-headCell`, metadata))}
    >
      {column.label}
    </th>
  );
};

export const renderTd: TableCellRenderer = (props) => {
  const { column, content, metadata } = props;
  return (
    <td
      key={column.key}
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
