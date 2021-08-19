import React from "react";
import { PropsWithMetadata } from "@highlight-ui/utils-commons";

export type TableHeadCellProps = PropsWithMetadata<{
  column: TableColumnDefinition;
  idx: number;
  reorder: (item: DraggedItem, newIndex: number) => void;
  onDragStatusChange: (index?: number) => void;
}>;

export type TableCellProps<TDataRow = any> = PropsWithMetadata<{
  column: TableColumnDefinition;
  columnIndex: number;
  content: any;
  dataRow: TDataRow;
  rowIndex: number;
  isDragged?: boolean;
}>;

export type TableRowProps<TDataRow = any> = PropsWithMetadata<{
  children: React.ReactNode;
  dataRow: TDataRow;
  rowIndex: number;
}>;

export type TableHeadCellRenderer = (
  h: TableHeadCellProps
) => React.ReactElement;

export type TableRowRenderer<TDataRow = any> = (
  r: TableRowProps<TDataRow>
) => React.ReactElement;

export type TableCellRenderer<TDataRow = any> = (
  c: TableCellProps<TDataRow>
) => React.ReactElement;

export type TableColumnDefinition<TDataRow = any> = {
  key?: string;
  label?: string;
  renderTh?: TableHeadCellRenderer;
  renderTd?: TableCellRenderer<TDataRow>;
};

export type DraggedItem = {
  id: TableColumnDefinition["key"];
  idx: number;
};

export type TableProps<TDataRow = any> = PropsWithMetadata<{
  /**
   * Can be used to provide a custom class name
   */
  className?: string;
  /**
   * An array of `TableColumnDefinition` objects that define how to render columns
   */
  columns?: TableColumnDefinition[];
  /**
   * An array of `TDataRow` objects that specify data for the table
   */
  data?: TDataRow[];
  /**
   * Define how many fixed columns you need in the table
   */
  fixedColumnCount?: number;
  /**
   * Specify if the header should be fixed when scrolling
   */
  fixedHeader?: boolean;
  /**
   * Can be used to provide a custom render function for all the data cells in the table
   */
  renderTd?: TableCellRenderer<TDataRow>;
  /**
   * Can be used to provide a custom render function for all the header cells in the table
   */
  Th?: TableHeadCellRenderer;
  /**
   * Can be used to provide a custom render function for all the rows in the table
   */
  renderTr?: TableRowRenderer<TDataRow>;
  /**
   * Can be used to specify the theme. it is a `defaultTheme` by default.
   */
  theme?: "light" | "default";

  setColumnsOrder: (newOrder: TableColumnDefinition[]) => void;
}>;
