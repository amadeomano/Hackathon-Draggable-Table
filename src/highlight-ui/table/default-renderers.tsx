import React from "react";
import mapValues from "lodash/fp/mapValues";
import { parseMetadata } from "@highlight-ui/utils-commons";
import {
  TableCellRenderer,
  TableHeadCellRenderer,
  TableRowRenderer
} from "./types";

export const renderTh: TableHeadCellRenderer = (props) => {
  const { column, metadata } = props;
  return (
    <th
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
