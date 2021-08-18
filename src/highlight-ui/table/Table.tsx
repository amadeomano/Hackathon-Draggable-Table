import React from "react";
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

export default class Table extends React.Component<TableProps> {
  tableRef: React.RefObject<HTMLTableElement>;

  debouncedStackFixedColumns: () => void;

  constructor(props: TableProps) {
    super(props);
    this.tableRef = React.createRef();
    this.debouncedStackFixedColumns = debounce(this.stackFixedColumns, 200);
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.debouncedStackFixedColumns);
    this.stackFixedColumns();
  };

  componentDidUpdate = () => this.debouncedStackFixedColumns();

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.debouncedStackFixedColumns);
  };

  stackFixedColumns = () => {
    const { fixedColumnCount } = this.props;
    const tableElement = this.tableRef.current;
    if (!fixedColumnCount || tableElement == null) return;
    stackColumnsToTheLeft(tableElement, fixedColumnCount);
  };

  render() {
    const {
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
    } = this.props;

    const innerMetadata = suffixMetadata(metadata);

    return (
      <table
        className={classnames(
          className,
          fixedHeader ? styles.fixedHeader : null,
          styles.table,
          styles[`fixedColumnCount${fixedColumnCount}`],
          theme ? styles[`${theme}Theme`] : styles.defaultTheme
        )}
        ref={this.tableRef}
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
  }
}
