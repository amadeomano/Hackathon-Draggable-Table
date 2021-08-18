/* eslint-disable implicit-arrow-linebreak */
import times from "lodash/times";

const getTableColumnWidth = (
  tableElement: HTMLElement,
  index: number
): number => {
  const tableColumnElement = tableElement.querySelector(
    `th:nth-child(${index + 1})`
  );
  return tableColumnElement
    ? tableColumnElement.getBoundingClientRect().width
    : 0;
};

const getTableColumnLeftOffset = (
  columnWidths: Array<number>,
  index: number
): number =>
  columnWidths.slice(0, index).reduce((current, sum) => sum + current, 0);

const getTableCells = (
  tableElement: HTMLElement,
  index: number
): Array<HTMLElement> =>
  Array.from(
    tableElement.querySelectorAll(
      `th:nth-child(${index + 1}), td:nth-child(${index + 1})`
    )
  );

const stackColumnsToTheLeft = (
  tableElement: HTMLElement,
  columnCount: number
): void => {
  const columnWidths = times(columnCount).map((index) =>
    getTableColumnWidth(tableElement, index)
  );
  const columnOffsets = columnWidths.map((_, index) =>
    getTableColumnLeftOffset(columnWidths, index)
  );
  columnOffsets.forEach((offset, index) => {
    Array.from(getTableCells(tableElement, index)).forEach((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.style.left = `${offset}px`;
    });
  });
};

export default stackColumnsToTheLeft;
