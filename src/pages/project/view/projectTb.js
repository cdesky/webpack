import { Table, Icon,Select ,Button,Popover} from "antd";
import dataList from '../dataList';

const Option=Select.Option
export default class ProjectTb extends Component {
  constructor(props) {
    super(props);
    this.state = { aa: false, header: [], body: [] };
  }

  componentDidMount() {
    let soures = dataList

    this.setState({
      header: soures.data.colList,
      body: soures.data.rowList
    }); 
     
  }

  //定位到某列
  pos(id){ 
    let ip=document.getElementById(id)
    ip.focus()
  }

  getHeader(colList=[]) { 
    colList &&
    colList.map((item, i) => { 
        
        if (item.colType === null) {
            return {
                fixed: 'left',
                // ...item,
                width: '30px',
                className: 'firstCol',
                render: () => null
            };
        }

        if (item.colType === 1) {
            return {
                fixed: 'left',
                ...item,
                title: item.title,
                className: 'budgetCol',
                // width:'200',
                render: (text, record) => { 
                    if (record.isExpenseRow !== 0 && record.isExpenseRow==1) { //总计行和父级不能修改供应商
                        //修改供应商的弹框区
                        const content = (
                            <div>
                                <p>
                                    供应商：
                                    <Select style={{ width: 150 }} defaultValue={record.supplierTypeId} onChange={this.selectSup} getPopupContainer={trigger => trigger.parentNode}>
                                        {this.state.supplierTypes &&
                                            this.state.supplierTypes.map((x, y) => {
                                                 
                                                    return (
                                                        <Option value={x.id} key={'sup' + y} disabled={x.isAvailable?false:true}>
                                                            {x.name}
                                                        </Option>
                                                    );
                                            })}
                                    </Select>
                                </p>
                                <p style={{ marginTop: 15, textAlign: 'right' }}>
                                    <Button type="primary" onClick={()=>this.changeSupply(record.id)} size="small">
                                        确定
                                    </Button>
                                </p>
                            </div>
                        );

                        return ( 
                            <div className="overFlowEllipsis " style={{ textIndent: '0.5em' ,position:'relative'}} title={text.budgetValue ? text.budgetValue : ''}  getPopupContainer={trigger => trigger.parentNode}>
                               <Popover placement="rightTop" title="修改供应商" content={content}  trigger="click" >
                                    <span className="hoverStyle" style={{ display: 'inline-block' }} onClick={()=>this.curSup(record.supplierTypeId)}>
                                        {text.budgetValue ? text.budgetValue : '--'}
                                    </span>
                                    </Popover>
                            </div>
                                
                        );
                    }
                    else return <div className="overFlowEllipsis " style={{ textIndent: '0.5em' }} title={text.budgetValue ? text.budgetValue : ''}>{text.budgetValue}</div>

                }
            };
        } else {
            let obj = {};

            if (item.colType===2) {
                //判断显示 配置图标 和列的定位
                obj = {
                    title: (
                        <div style={{position:'relative'}}>
                        <span onClick={() => this.pos(item.firstColCode)} style={{ cursor: 'pointer' }} className="positionCol" title="定位列">
                            {item.title} 
                        </span>
                        <Icon type="setting" style={{ color: '#08b9f4',position:'absolute',top:0,right:6,cursor:'pointer' }} title="配置" onClick={()=>this.setConfig(item)}/>
                        </div>
                    )
                };
            } else {
                obj = {
                    title: (
                        <span>
                            <input type="text" id={item.firstColCode} style={{ width: 0,border:'none' }} />
                            {item.title}
                        </span>
                    )
                };
            }

            return {
                width: 300,
                className: 'otherTitle',
                ...obj, 
                children: [
                    {
                        title: '预算',
                        dataIndex: 'budget',
                        key: 'budget' + i,
                        width: 100,
                        className: 'otherCol',
                        render: (text, record) => {
                            console.log(item,record,'2222')
                            if (record[item.dataIndex] && typeof record[item.dataIndex] === 'object') {
                                const value =
                                    typeof record[item.dataIndex].budgetValue === 'string' && record[item.dataIndex].budgetValue !== ''
                                        ? (+record[item.dataIndex].budgetValue).toLocaleString('en-US')
                                        : '--';
                                if (record[item.dataIndex].isBudgetValueInput == 1) {
                                    {
                                        return (
                                            <div
                                                className={'specialEdit hoverStyle'}
                                                style={{ color: value !== '--' ? '#5f5d5d' : '#ccc' }}
                                                title={value}
                                                onClick={() => {
                                                    this.handleCellModal(record.id, item.id,record.resourceName, item.resourceName,'budget',record.resourceCode,item.resourceCode);
                                                }}
                                            >
                                                <span className={'overFlowEllipsis'}>{value}</span>
                                            </div>
                                        );
                                    }
                                }
                                else if((item.colType===0 || item.colType===1)&&record.resourceCode==="sum_row"){
                                   return <div style={{ color:'#04c1ff',cursor:'pointer'}} title={value}  onClick={()=>this.getMarks(record[item.dataIndex].budgetColCode,record[item.dataIndex].budgetRowCode,'budget')}>
                                          <Icon type="file-search" /> {value}
                                        </div>
                                } else {
                                    return (
                                        <div style={{ color: value !== '--' ? '#5f5d5d' : '#ccc' }} title={value}>
                                            <span className={'overFlowEllipsis'}>{value}</span>
                                        </div>
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '更新预算',
                        dataIndex: 'update',
                        key: 'update' + i,
                        width: 100,
                        className: 'otherCol',
                        render: (text, record) => {
                            if (record[item.dataIndex] && typeof record[item.dataIndex] === 'object') {
                                const resourceValueUpdate =
                                    typeof record[item.dataIndex].updateBudgetValue === 'string'
                                        ? (+record[item.dataIndex].updateBudgetValue).toLocaleString('en-US')
                                        : '--';

                                if (record[item.dataIndex].isUpdateBudgetValue == 1) {
                                    {
                                        return (
                                            <div
                                                className={'specialEdit hoverStyle'}
                                                title={resourceValueUpdate}
                                                style={{ color: resourceValueUpdate !== '--' ? '#5f5d5d' : '#ccc' }}
                                                 
                                                onClick={() => {
                                                    this.handleCellModal(record.id, item.id,record.resourceName, item.resourceName,'updateBudget',record.resourceCode,item.resourceCode);
                                                }}
                                            >
                                                <span className={'overFlowEllipsis'}>{resourceValueUpdate}</span>
                                            </div>
                                        );
                                    }
                                }  else if((item.colType===0 || item.colType===1)&&record.resourceCode==="sum_row"){
                                    return <div style={{ color: '#04c1ff',cursor:'pointer'}} title={resourceValueUpdate} onClick={()=>this.getMarks(record[item.dataIndex].budgetColCode,record[item.dataIndex].budgetRowCode,'updateBudget')}>
                                            <Icon type="file-search" /> {resourceValueUpdate}
                                         </div>
                                 }else {
                                    return (
                                        <div style={{ color: resourceValueUpdate !== '--' ? '#5f5d5d' : '#ccc' }} title={resourceValueUpdate}>
                                            <span className={'overFlowEllipsis'}>{resourceValueUpdate}</span>
                                        </div>
                                    );
                                }
                            }
                        }
                    },
                    {
                        title: '实际',
                        dataIndex: 'active',
                        key: 'active' + i,
                        width: 100,
                        className: 'otherCol',
                        render: (text, record) => {
                            if (record[item.dataIndex] && typeof record[item.dataIndex] === 'object') {
                                const resourceValuePlan =
                                    typeof record[item.dataIndex].actualValue === 'string'
                                        ? (+record[item.dataIndex].actualValue).toLocaleString('en-US')
                                        : '--';

                                    return (
                                        <div style={{ color: resourceValuePlan !== '--' ? '#5f5d5d' : '#ccc' }} title={resourceValuePlan}>
                                            <span className={'overFlowEllipsis'}>{resourceValuePlan}</span>
                                        </div>
                                    );
                            }
                        }
                    }
                ]
            };
        }
    })
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
    let source=this.getSource(this.state.body)

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
