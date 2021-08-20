import { useMemo } from "react";

// techdebt: should query the th list using table ref
export const useAreas = () =>
  [...document.querySelectorAll("table th")]
    .map((n) => n.getBoundingClientRect())
    .map(({ x, width }) => ({ start: x, end: x + width }));
