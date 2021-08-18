import "./styles.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import withScrolling from "react-dnd-scrolling";
import Table from "./highlight-ui/table/Table";
import { columns, data } from "./data";

const ScrollWrapper = withScrolling("div");

export default function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <ScrollWrapper>
          <Table
            columns={columns}
            data={data}
            theme={undefined}
            fixedColumnCount={undefined}
            fixedHeader={undefined}
          />
        </ScrollWrapper>
      </DndProvider>
    </div>
  );
}
