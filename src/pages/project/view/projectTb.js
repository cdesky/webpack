import { Table, Icon } from "antd";
import dataList from '../dataList';
export default class ProjectTb extends Component {
  constructor(props) {
    super(props);
    this.state = { aa: false, header: [], data: [] };
  }

  componentDidMount() {
    let soures = dataList

    this.setState({
      data: soures.data.colList,
      header: soures.data.rowList
    }); 
     
  }

  //定位到某列
  pos(id){ 
    let ip=document.getElementById(id)
    ip.focus()
  }

  getHeader(item=[]) { 
    let columns = [];
    columns.push({
      fixed: 'left',
      // ...item,
      width: '30px',
      className: '123',
      render: () => null
    })
    item &&
      item.map((col, i) => {
        if (col.resourceName == "费用科目") {
          // console.log('"first" + i',"first" + i)
          columns.push({
            // width: 250,
            title: col.resourceName,
            dataIndex: col.dataIndex,
            key: col.key,
            fixed: "left",
            className: "firstCol",
            render: val => {
              return (
                <div onClick={() => alert(0)} className="bugetFixed">
                  {val}
                </div>
              );
            }
          });
        } else if (
          col.resourceName == "2018汇总" ||
          col.resourceName == "2019汇总" ||
          col.resourceName == "2020汇总"
        ) {
          columns.push({
            // dataIndex: col.dataIndex,
            // key: col.key,
            title: <span onClick={()=>this.pos('2020汇总')} style={{cursor:'pointer'}} className='positionCol' title='定位列'>{col.resourceName}</span>,
            width: 240,
            filterIcon: <Icon type="setting" style={{ color: "#08b9f4" }}/>,
            filterDropdown: <div className="custom-filter-dropdown" />,
            filterDropdownVisible: false,
            onFilterDropdownVisibleChange: () => {
              this.setState({
                aa: true
              });
            },
            children: [
              {
                width: 80,
                title: "预算",
                dataIndex: "buget",
                key: col.key + Math.random(),
                render: () => {
                  return col.resourceName==='2020汇总' ? <input type='text' id='2020汇总' style={{width:0,border:'none'}}/>:null
                }
              },
              {
                width: 80,
                title: "更新预算",
                dataIndex: "upbuget",
                key: col.key + Math.random(),
                render: t => {
                  return t;
                }
              },
              {
                width: 80,
                title: "实际",
                dataIndex: "fact",
                key: col.key + Math.random(),
                render: t => {
                  return t;
                }
              }
            ]
          });
        } else {
          columns.push({
            // dataIndex: col.dataIndex,
            // key: col.key,
            title: col.resourceName,
            width: 240,
            children: [
              {
                width: 80,
                title: "预算",
                dataIndex: "buget",
                key: col.key + Math.random(),
                render: () => {
                  return i;
                }
              },
              {
                width: 80,
                title: "更新预算",
                dataIndex: "upbuget",
                key: col.key + Math.random(),
                render: () => {
                  return i;
                }
              },
              {
                width: 80,
                title: "实际",
                dataIndex: "fact",
                key: col.key + Math.random(),
                render: () => {
                  return i;
                }
              }
            ]
          });
        }
      });

    return columns;
  };


  getSource(source){
    source.map(val=>{
      val.rowKey=val.key
      // delete val.key;
      // delete val.id;
      if(val.children) this.getSource(val.children)
    })


return source     
  }

  render() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      }
    };

    let header = this.getHeader(this.state.header);
    let source=this.getSource(this.state.data)

    console.log('1111',source)
    return (
      <div className="tables">
        {this.state.aa ? "aaa" : null}
        <Table
          rowSelection={rowSelection}
          rowKey="tables2"
          id="111"
          bordered
          columns={header}
          dataSource={source}
          size="middle"
          scroll={{ x: (this.state.header.length*3)*80, y: 350 }} 
          // expandedRowKeys={[source.map(item =>  item.key)]} 
        />
      </div>
    );
  }
}
