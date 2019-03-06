import { Table } from "antd";
import { DragDropContext, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

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
        // console.log(restProps);
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

// 当前拖拽表格行
const rowSource = {
    beginDrag(props) {
        // 暂时不管，好像是用来渲染不同的样式
        dragingIndex = props.index;
        // console.log(props);
        // props['data-row-key']   唯一id
        // props.className   层级
        // console.log(props.className);
        return {
            index: {
                dragId: props['data-row-key'],
                dragLevel: props.className,
                dragIndex: props.index
            },
        };
    },
};

// 目标拖拽表格行
const rowTarget = {
    drop(props, monitor) {
        // props['data-row-key']   唯一id
        // props.className   层级
        const dragIndex = monitor.getItem().index;
        const hoverIndex = {
            hoverId: props['data-row-key'],
            hoverLevel: props.className,
            hoverIndex: props.index
        };

        // 拖拽行和目标行一样时不进行拖拽
        if (dragIndex.dragIndex === hoverIndex.hoverIndex) {
            return;
        }

        // 实际拖拽动作
        props.moveRow(dragIndex, hoverIndex);

        monitor.getItem().index = hoverIndex.hoverIndex;
        // monitor.getItem().index.dragIndex = hoverIndex.hoverIndex;
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
// const rowSource = {
//   beginDrag(props) {
//     dragingIndex = props.index;
//     return {
//       index: props.index
//     };
//   }
// };

// const rowTarget = {
//   drop(props, monitor) {
//     const dragIndex = monitor.getItem().index;
//     const hoverIndex = props.index;

//     // Don't replace items with themselves
//     if (dragIndex === hoverIndex) {
//       return;
//     }

//     // Time to actually perform the action
//     props.moveRow(dragIndex, hoverIndex);

//     // Note: we're mutating the monitor item here!
//     // Generally it's better to avoid mutations,
//     // but it's good here for the sake of performance
//     // to avoid expensive index searches.
//     monitor.getItem().index = hoverIndex;
//   }
// };

// const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
//   connectDropTarget: connect.dropTarget(),
//   isOver: monitor.isOver()
  
// }))(
//   DragSource("row", rowSource, connect => ({
//     connectDragSource: connect.dragSource()
    
//   }
//   ))(BodyRow)
// );
 
class DragTr extends Component {
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
    }
    
   
    this.components = {
        body: {
          row: DragableBodyRow
        }
      }
  }

  // 遍历任务列表找到当前拖拽行数据
  filterDragRow =(dataList, id) => {
    // console.log(dataList, id);
    for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].id === id) {
            return this.setState({dragRowData: dataList[i]});
        } else if (dataList[i].children && Array.isArray(dataList[i].children)) {
            this.filterDragRow(dataList[i].children, id);
        }
    }
};

// 遍历任务列表找到当前hover行数据
filterHoverRow (dataList, id){
    // console.log(dataList, id);
    for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].id === id) {
            return this.setState({hoverRowData: dataList[i]});
        } else if (dataList[i].children && Array.isArray(dataList[i].children)) {
            this.filterHoverRow(dataList[i].children, id);
        }
    }
};

  
  
//   moveRow(dragIndex, hoverIndex){
//     const { data } = this.state;
//     const dragRow = data[dragIndex];

//     this.setState(
//       update(this.state, {
//         data: {
//           $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]
//         }
//       })
//     );
//   }

  // 拖拽任务分类表格行事件
  moveRow (dragIndex, hoverIndex){ 
    try {
        // this.loadingMethod();
        // 定义拖拽类型
        let moveType = null;
        const  dataList  = this.state.content;
        this.filterDragRow(dataList, dragIndex.dragId);
        this.filterHoverRow(dataList, hoverIndex.hoverId);
        if (this.state.dragRowData.parentId && this.state.hoverRowData.parentId) {
            if (this.state.dragRowData.parentId === this.state.hoverRowData.parentId) {
                if (dragIndex.dragIndex < hoverIndex.hoverIndex) {
                    moveType = 2;
                } else if (dragIndex.dragIndex > hoverIndex.hoverIndex) {
                    moveType = 1;
                } else {
                    return;
                }
            } else {
                return message.info('不同层级间不能拖拽');
            }
        } else {
            if (this.state.dragRowData.parentId === null && this.state.hoverRowData.parentId === null) {
                if (dragIndex.dragIndex < hoverIndex.hoverIndex) {
                    moveType = 2;
                } else if (dragIndex.dragIndex > hoverIndex.hoverIndex) {
                    moveType = 1;
                } else {
                    return;
                }
            } else {
                return message.info('不同层级间不能拖拽');
            }
        }

        console.log('dragend', dragIndex.dragId,hoverIndex.hoverId,moveType)

        // await $http.request({
        //     url: '/sort-task-lib',
        //     method: 'POST',
        //     data: {
        //         currentId: dragIndex.dragId,
        //         targetId: hoverIndex.hoverId,
        //         orderDirection: moveType
        //     }
        // });

        // // 重新请求任务类型数据
        // await this.props.loadTaskLibraryList();
    } catch (err) {
        console.log(err);
    }
};
  

  render() {
    return (
      <Table
        columns={this.state.columns}
        dataSource={this.state.content}
        components={this.components}
        onRow={(record, index) => ({
          index,
          moveRow: this.moveRow
        })}
      />
    );
  }
}

const Demo = DragDropContext(HTML5Backend)(DragTr);
export default Demo;
