import { Table } from "antd";
import tableData from "./other.json";
import row from "./table.json";

export default class ProjectTb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getCol(row);
  }

  getCol = rows => {
    rows.map((x) => {
     
    });
  };

  render() {
    const columns = [
      {
        title: "一级任务",
        dataIndex: "firstTask",
        children: [
          {
            title: "任务名称",
            dataIndex: "levelTaskName",
            render: (value, row) => {
              const obj = {
                children: value,
                props: {
                  rowSpan: row.rowSpan
                }
              };
              return obj;
            }
          },
          {
            title: "合计",
            dataIndex: "totalHours",
            render: (value, row) => {
              const obj = {
                children: value,
                props: {
                  rowSpan: row.rowSpan
                }
              };
              return obj;
            }
          }
        ]
      },
      {
        title: "二级任务",
        dataIndex: "secondTask",
        children: [
          {
            title: "任务名称",
            dataIndex: "levelTaskName2",
            render: (value, row) => {
              const obj = {
                children: value,
                props: {
                  rowSpan: row.rowSpan2
                }
              };
              return obj;
            }
          },
          {
            title: "合计",
            dataIndex: "totalHours2",
            render: (value, row) => {
              const obj = {
                children: value,
                props: {
                  rowSpan: row.rowSpan2
                }
              };
              return obj;
            }
          }
        ]
      },
      {
        title: "三级任务",
        dataIndex: "thirdTask",
        children: [
          {
            title: "任务名称",
            dataIndex: "levelTaskName3",
            render: text => {
              return text;
            }
          },
          {
            title: "合计",
            dataIndex: "totalHours3",
            render: text => {
              return text;
            }
          },
          {
            title: "部门",
            dataIndex: "deptName3",
            render: text => {
              return text.join("、");
            }
          }
        ]
      }
    ];

    const data = tableData;

    return (
      <Table
        rowKey="tables"
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={data}
        bordered
        defaultExpandAllRows={true}
      />
    );
  }
}
