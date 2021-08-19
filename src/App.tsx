import { useState } from "react";
import "./styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Table from "./highlight-ui/table/Table";
import { columns as initColumns, data } from "./data";

export default function App() {
  const [columns, setColumns] = useState(initColumns);

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Table
          columns={columns}
          data={data}
          theme={undefined}
          fixedColumnCount={undefined}
          fixedHeader={undefined}
          setColumnsOrder={setColumns}
        />
      </DndProvider>
    </div>
  );
}
