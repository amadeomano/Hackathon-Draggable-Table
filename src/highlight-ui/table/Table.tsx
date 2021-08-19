import React, { useEffect, useRef, useCallback, useState } from "react";
import classnames from "classnames";
import debounce from "lodash/debounce";
import getOr from "lodash/fp/getOr";
import { parseMetadata, suffixMetadata } from "@highlight-ui/utils-commons";
import styles from "./Table.module.scss";
import stackColumnsToTheLeft from "./dom-helpers";
import {
  renderTd as defaultRenderTd,
  Th as DefaultTh,
  renderTr as defaultRenderTr
} from "./default-renderers";
import { DraggedItem, TableProps } from "./types";

const Table = ({
  className,
  columns = [],
  data = [],
  fixedColumnCount = 0,
  fixedHeader,
  renderTd = defaultRenderTd,
  Th = DefaultTh,
  renderTr = defaultRenderTr,
  metadata,
  theme = "default",
  setColumnsOrder
}: TableProps) => {
  const tableRef = useRef();
  const debouncedStackFixedColumns = useRef<() => void>(() => {});
  const innerMetadata = suffixMetadata(metadata);
  const [dragIndex, setDragIndex] = useState(null);

  const stackFixedColumns = () => {
    const tableElement = tableRef.current;
    if (!fixedColumnCount || tableElement == null) return;
    stackColumnsToTheLeft(tableElement, fixedColumnCount);
  };

  useEffect(() => {
    debouncedStackFixedColumns.current = debounce(stackFixedColumns, 200);
    window.addEventListener("resize", debouncedStackFixedColumns.current);
    stackFixedColumns();

    return () => {
      window.removeEventListener("resize", debouncedStackFixedColumns.current);
    };
    /* eslint-disable-next-line */
  }, []);

  const reorder = useCallback(
    (item: DraggedItem, newIndex: number) => {
      const newOrder = [...columns];
      const { idx: currentIndex } = item;

      const [removedColumn] = newOrder.splice(currentIndex, 1);

      newOrder.splice(newIndex, 0, removedColumn);

      setColumnsOrder(newOrder);
    },
    [columns, setColumnsOrder]
  );

  debouncedStackFixedColumns.current();

  return (
    <table
      className={classnames(
        className,
        fixedHeader ? styles.fixedHeader : null,
        styles.table,
        styles[`fixedColumnCount${fixedColumnCount}`],
        theme ? styles[`${theme}Theme`] : styles.defaultTheme
      )}
      ref={tableRef}
      {...parseMetadata(metadata)}
    >
      <thead {...parseMetadata(innerMetadata("head"))}>
        <tr {...parseMetadata(innerMetadata("headRow"))}>
          {columns.map((column, idx) => (
            <Th
              key={column.key}
              {...{ column, idx, metadata, reorder }}
              onDragStatusChange={setDragIndex}
            />
          ))}
        </tr>
      </thead>
      <tbody {...parseMetadata(innerMetadata("body"))}>
        {data.map((dataRow, rowIndex) =>
          renderTr({
            children: columns
              .map((column) => ({ renderTd, ...column }))
              .map((column, columnIndex) =>
                column.renderTd({
                  column,
                  columnIndex,
                  content: getOr(undefined, column.key || "", dataRow),
                  dataRow,
                  rowIndex,
                  metadata,
                  isDragged: dragIndex === columnIndex
                })
              ),
            dataRow,
            rowIndex,
            metadata
          })
        )}
      </tbody>
    </table>
  );
};

export default Table;
