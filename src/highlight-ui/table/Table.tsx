import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import debounce from "lodash/debounce";
import getOr from "lodash/fp/getOr";
import { parseMetadata, suffixMetadata } from "@highlight-ui/utils-commons";
import styles from "./Table.module.scss";
import stackColumnsToTheLeft from "./dom-helpers";
import {
  renderTd as defaultRenderTd,
  renderTh as defaultRenderTh,
  renderTr as defaultRenderTr
} from "./default-renderers";
import { TableProps } from "./types";

const Table = ({
  className,
  columns = [],
  data = [],
  fixedColumnCount = 0,
  fixedHeader,
  renderTd = defaultRenderTd,
  renderTh = defaultRenderTh,
  renderTr = defaultRenderTr,
  metadata,
  theme = "default"
}: TableProps) => {
  const tableRef = useRef();
  const debouncedStackFixedColumns = useRef<() => void>(() => {});
  const innerMetadata = suffixMetadata(metadata);

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
          {columns
            .map((column) => ({ renderTh, ...column }))
            .map((column, columnIndex) =>
              column.renderTh({ column, columnIndex, metadata })
            )}
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
                  metadata
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
