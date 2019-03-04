import { Table } from "antd";

// https://github.com/raisezhang/react-drag-listview
// const ReactDragListView = window["react-drag-listview"];
import ReactDragListView from "react-drag-listview";
// import react-drag-listview from "react-drag-listview";

export default class DragTr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          key: "1",
          name: "Boran",
          gender: "male",
          age: "12",
          address: "New York"
        },
        {
          key: "2",
          name: "JayChou",
          gender: "male",
          age: "38",
          address: "TaiWan"
        },
        {
          key: "3",
          name: "Lee",
          gender: "female",
          age: "22",
          address: "BeiJing"
        },
        {
          key: "4",
          name: "ChouTan",
          gender: "male",
          age: "31",
          address: "HangZhou"
        },
        {
          key: "5",
          name: "AiTing",
          gender: "female",
          age: "22",
          address: "Xi’An"
        }
      ]
    };
    this.columns = [
      {
        title: "Key",
        dataIndex: "key"
      },
      {
        title: "Name",
        dataIndex: "name"
      },
      {
        title: "Gender",
        dataIndex: "gender"
      },
      {
        title: "Age",
        dataIndex: "age"
      },
      {
        title: "Address",
        dataIndex: "address"
      },
      {
        title: "Operates",
        key: "operate",
        render: () => (
          <a className="drag-handle" href="#">
            Drag
          </a>
        )
      }
    ];

    const that = this;
    this.dragProps = {
      onDragEnd(fromIndex, toIndex, direction) {
        /**
         * currentId: 当前模板节点id
         * targetId: 目标模板节点id
         * orderDirection: 排序方向：1-目标节点上面；2-目标节点下面
         */
        if (fromIndex.length > 1) {
          console.log(fromIndex, toIndex, direction);
        } else {
          const data = that.state.data;
          const item = data.splice(fromIndex, 1)[0];
          data.splice(toIndex, 0, item);
          console.log("datas", data);
          that.setState({
            data
          });
        }
      },
      handleSelector: "a"
    };
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <h2>Table row with dragging</h2>
        <ReactDragListView {...this.dragProps}>
          <Table
            columns={this.columns}
            pagination={false}
            dataSource={this.state.data}
          />
        </ReactDragListView>
      </div>
    );
  }
}
