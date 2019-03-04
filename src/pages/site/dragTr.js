import { Table } from "antd";
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

let dragingIndex = -1;

class BodyRow extends React.Component {
  constructor(props){
    super(props)
  }

  render() { 
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;

    this.style = { ...restProps.style, cursor: "move" };
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
        <tr {...restProps} className={className} style={this.style} />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
  
}))(
  DragSource("row", rowSource, connect => ({
    connectDragSource: connect.dragSource()
    
  }
  ))(BodyRow)
);



class DragTr extends React.Component {
  constructor(props){
    super(props)
    this.columns = [
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

    this.state = {
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park"
        }
      ]
    };
  
    this.components = {
      body: {
        row: DragableBodyRow
      }
    };
  }
  
  moveRow(dragIndex, hoverIndex){
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
        }
      })
    );
  }
  

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.state.data}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: rowTarget
        })}
      />
    );
  }
}

const Demo = DragDropContext(HTML5Backend)(DragTr);
export default Demo;
