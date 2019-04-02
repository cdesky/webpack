import { Table } from "antd";
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from 'immutability-helper';
import './site.css'; 

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
          ...restProps
        } = this.props;
        const style = { ...restProps.style, cursor: 'move' };
    
        let className = restProps.className;
        if (isOver) {
          if (restProps.index > dragingIndex) {
            className += ' drop-over-downward';
          }
          if (restProps.index < dragingIndex) {
            className += ' drop-over-upward';
          }
        }
    
        return connectDragSource(
          connectDropTarget(
            <tr
              {...restProps}
              className={className}
              style={style}
            />
          )
        );
      }  
}
const rowSource = {
    beginDrag(props) {
      dragingIndex = props.index;
      return {
        index: props.index,
      };
    },
  };
  
  const rowTarget = {
    drop(props, monitor){
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
  
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
  
      // Time to actually perform the action
      props.moverow(dragIndex, hoverIndex);
  
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    },
  };
  
  const DragableBodyRow = DropTarget(
    'row',
    rowTarget,
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    }),
  )(
    DragSource(
      'row',
      rowSource,
      (connect) => ({
        connectDragSource: connect.dragSource(),
      }),
    )(BodyRow),
  );
  
 
class DragTr2 extends Component {
  constructor(props){
    super(props);
    this.state={
        columns:[
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
          ],
        content:[
            {
              key: "1",
              name: "cde",
              age: 11,
              address: "New York No. 1 Lake Park"
            },
            {
              key: "2",
              name: "yang",
              age: 22,
              address: "London No. 1 Lake Park"
            },
            {
              key: "3",
              name: "Joe Black",
              age: 33,
              address: "Sidney No. 1 Lake Park"
            },
            {
              key: "4",
              name: "ruby",
              age: 33,
              address: "rasdfwerwqer"
            },
            {
              key: "5",
              name: "zhang cheng",
              age: 33,
              address: "bsdfsadfs"
            },
            {
              key: "6",
              name: "lily",
              age: 33,
              address: "aaaaasdfsdf"
            }
          ]
    }
  }

  components = {
    body: {
      row: DragableBodyRow
    }
  }

  
  
  moverow=(dragIndex, hoverIndex)=>{
    const { content } = this.state;
    const dragRow = content[dragIndex];

    this.setState(
      update(this.state, {
        content: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
        }
      })
    );
  }
 
  render() {
    return (
      <Table
        id='dragTb'
        columns={this.state.columns}
        dataSource={this.state.content}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moverow: this.moverow
        })}
      />
    );
  }
}

const Demo = DragDropContext(HTML5Backend)(DragTr2);
export default Demo;
