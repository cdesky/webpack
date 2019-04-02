import { Table } from "antd";
import { DragDropContext,DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
// import update from 'immutability-helper';
import "./site.css";

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: "move" };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />
      )
    );
  }
}

// 当前拖拽表格行
const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

// 目标拖拽表格行
const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    // 实际移动动作
    props.moverow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

// 合并拖拽表格行
const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource("row", rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];

class DragTr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "11",
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park"
        },
        {
          id: "22",
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park"
        },
        {
          id: "33",
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park"
        }
      ]
    };
  }

  components = {
    body: {
      row: DragableBodyRow
    }
  };

  // 拖拽任务分类表格行事件
  moverow = (dragIndex, hoverIndex) => {
    try {
      // 定义拖拽类型
      let moveType;
      const { data } = this.state;
      const dragRow = data[dragIndex];
      if (dragIndex < hoverIndex) {
        moveType = "DOWN";
      } else if (dragIndex > hoverIndex) {
        moveType = "UP";
      } else {
        return;
      }

      console.log("dragRow", dragRow.id, data[hoverIndex].id, moveType);
    } catch (err) {
    } finally {
    }
  };

  render() {
    return (
      <Table
        id="dragTb"
        columns={columns}
        dataSource={this.state.data}
        components={this.components}
        rowKey={record => record.id}
        pagination={false}
        onRow={(record, index) => ({
          index,
          moverow: this.moverow
        })}
      />
    );
  }
}

const _DragTr = DragDropContext(HTML5Backend)(DragTr);
export default _DragTr;
