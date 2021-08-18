import "./styles.css";
import Table from "./highlight-ui/table/Table";
import { columns, data } from "./data";

export default function App() {
  return (
    <div className="App">
      <Table
        columns={columns}
        data={data}
        theme={undefined}
        fixedColumnCount={1}
        fixedHeader
      />
    </div>
  );
}
