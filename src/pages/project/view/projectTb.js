import { Table, Icon } from "antd";
import dataList from "../dataList";
import "./projectTb.less";

export default class ProjectTb extends Component {
  constructor(props) {
    super(props);
    this.state = { aa: false, header: [], body: [] ,expandedRowKeys:[]};
  }

  componentDidMount() {
    let soures = dataList;
  
    this.setState({
      header: soures.data.colList,
      body: soures.data.rowList,
      expandedRowKeys:soures.data.parentIds
    });
  }

  //定位到某列
  pos(id) {
    let ip = document.getElementById(id);
    ip.focus();
  }

  getHeader(colList) {
    return (
      colList &&
      colList.map((item, i) => {
        if (item.colType === null) {
          return {
            fixed: "left",
            // ...item,
            width: "30px",
            className: "firstCol",
            render: () => null
          };
        }

        if (item.colType === -2) {
          return {
            fixed: "left",
            ...item,
            title: item.title,
            className: "budgetCol",
            // width:'200',
            render: text => {
              return (
                <div
                  className="overFlowEllipsis "
                  style={{ textIndent: "0.5em" }}
                  title={text.resourceValue ? text.resourceValue : ""}
                >
                  {text.resourceValue}
                </div>
              );
            }
          };
        } else {
          let obj = {};

          if (item.colType === 2) {
            //判断显示 配置图标 和列的定位
            obj = {
              title: (
                <div style={{ position: "relative" }}>
                  <span
                    onClick={() => this.pos(item.firstColCode)}
                    style={{ cursor: "pointer" }}
                    className="positionCol"
                    title="定位列"
                  >
                    {item.title}
                  </span>
                  <Icon
                    type="setting"
                    style={{
                      color: "#08b9f4",
                      position: "absolute",
                      top: 0,
                      right: 6,
                      cursor: "pointer"
                    }}
                    title="配置"
                    onClick={() => this.setConfig(item)}
                  />
                </div>
              )
            };
          } else {
            obj = {
              title: (
                <span>
                  <input
                    type="text"
                    id={item.firstColCode}
                    style={{ width: 0, border: "none" }}
                  />
                  {item.title}
                </span>
              )
            };
          }

          return {
            width: 300,
            className: "otherTitle",
            ...obj,
            children: [
              {
                title: "预算",
                dataIndex: "budget",
                key: "budget" + i,
                width: 100,
                className: "otherCol",
                render: (text, record) => {
                  if (
                    record[item.dataIndex] &&
                    typeof record[item.dataIndex] === "object"
                  ) {
                    const value =
                      typeof record[item.dataIndex].budgetValue === "string" &&
                      record[item.dataIndex].budgetValue !== ""
                        ? (+record[item.dataIndex].budgetValue).toLocaleString(
                            "en-US"
                          )
                        : "--";
                    if (record[item.dataIndex].isBudgetValueInput == 1) {
                      {
                        return (
                          <div
                            className={"specialEdit hoverStyle"}
                            style={{
                              color: value !== "--" ? "#5f5d5d" : "#ccc"
                            }}
                            title={value}
                            onClick={() => {
                              this.handleCellModal(
                                record.id,
                                item.id,
                                record.resourceName,
                                item.resourceName,
                                "budget",
                                record.resourceCode,
                                item.resourceCode
                              );
                            }}
                          >
                            <span className={"overFlowEllipsis"}>{value}</span>
                          </div>
                        );
                      }
                    } else if (
                      (item.colType === 0 || item.colType === 1) &&
                      record.resourceCode === "sum_row"
                    ) {
                      return (
                        <div
                          style={{ color: "#04c1ff", cursor: "pointer" }}
                          title={value}
                          onClick={() =>
                            this.getMarks(
                              record[item.dataIndex].budgetColCode,
                              record[item.dataIndex].budgetRowCode,
                              "budget"
                            )
                          }
                        >
                          <Icon type="file-search" /> {value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          style={{ color: value !== "--" ? "#5f5d5d" : "#ccc" }}
                          title={value}
                        >
                          <span className={"overFlowEllipsis"}>{value}</span>
                        </div>
                      );
                    }
                  }
                }
              },
              {
                title: "更新预算",
                dataIndex: "update",
                key: "update" + i,
                width: 100,
                className: "otherCol",
                render: (text, record) => {
                  if (
                    record[item.dataIndex] &&
                    typeof record[item.dataIndex] === "object"
                  ) {
                    const resourceValueUpdate =
                      typeof record[item.dataIndex].updateBudgetValue ===
                      "string"
                        ? (+record[item.dataIndex]
                            .updateBudgetValue).toLocaleString("en-US")
                        : "--";

                    if (record[item.dataIndex].isUpdateBudgetValue == 1) {
                      {
                        return (
                          <div
                            className={"specialEdit hoverStyle"}
                            title={resourceValueUpdate}
                            style={{
                              color:
                                resourceValueUpdate !== "--"
                                  ? "#5f5d5d"
                                  : "#ccc"
                            }}
                            onClick={() => {
                              this.handleCellModal(
                                record.id,
                                item.id,
                                record.resourceName,
                                item.resourceName,
                                "updateBudget",
                                record.resourceCode,
                                item.resourceCode
                              );
                            }}
                          >
                            <span className={"overFlowEllipsis"}>
                              {resourceValueUpdate}
                            </span>
                          </div>
                        );
                      }
                    } else if (
                      (item.colType === 0 || item.colType === 1) &&
                      record.resourceCode === "sum_row"
                    ) {
                      return (
                        <div
                          style={{ color: "#04c1ff", cursor: "pointer" }}
                          title={resourceValueUpdate}
                          onClick={() =>
                            this.getMarks(
                              record[item.dataIndex].budgetColCode,
                              record[item.dataIndex].budgetRowCode,
                              "updateBudget"
                            )
                          }
                        >
                          <Icon type="file-search" /> {resourceValueUpdate}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          style={{
                            color:
                              resourceValueUpdate !== "--" ? "#5f5d5d" : "#ccc"
                          }}
                          title={resourceValueUpdate}
                        >
                          <span className={"overFlowEllipsis"}>
                            {resourceValueUpdate}
                          </span>
                        </div>
                      );
                    }
                  }
                }
              },
              {
                title: "实际",
                dataIndex: "active",
                key: "active" + i,
                width: 100,
                className: "otherCol",
                render: (text, record) => {
                  if (
                    record[item.dataIndex] &&
                    typeof record[item.dataIndex] === "object"
                  ) {
                    const resourceValuePlan =
                      typeof record[item.dataIndex].actualValue === "string"
                        ? (+record[item.dataIndex].actualValue).toLocaleString(
                            "en-US"
                          )
                        : "--";

                    return (
                      <div
                        style={{
                          color: resourceValuePlan !== "--" ? "#5f5d5d" : "#ccc"
                        }}
                        title={resourceValuePlan}
                      >
                        <span className={"overFlowEllipsis"}>
                          {resourceValuePlan}
                        </span>
                      </div>
                    );
                  }
                }
              }
            ]
          };
        }
      })
    );
  }

  getSource(source) {
    source.map(val => {
      val.rowKey = val.key;
      // delete val.key;
      // delete val.id;
      if (val.children) this.getSource(val.children);
    });

    return source;
  }

  // 点击展开行 事件
  handleOnExpand (expanded, record){
    if (!expanded) {
        let cloneExpand = _.cloneDeep(this.state.expandedRowKeys);
        let newExpandKeys = _.remove(cloneExpand, item => {
            return item !== record.id;
        });
        this.setState({
            expandedRowKeys: newExpandKeys
        });
    } else {
        this.setState({
            expandedRowKeys: this.state.expandedRowKeys.concat(record.id)
        });
    }
};

// 表格变化
tableChange (pagination, filters) {
    this.setState({
        col_028: filters.col_028 || [],
        col_004: filters.col_004 || []
    });
    this.initData(filters);
};

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
      },
      getCheckboxProps: record => ({
        disabled: !(record.isCollectRow === 0)
      })
    };

    let header = this.getHeader(this.state.header);
    let source = this.getSource(this.state.body);

    console.log("1111", source);
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
          defaultExpandAllRows={true}
        //   size="middle"
          scroll={{ x: this.state.header.length * 3 * 80, y: 350 }}
          onExpand={()=>this.handleOnExpand}
          expandedRowKeys={this.state.expandedRowKeys}
          pagination={false}
          onChange={()=>this.tableChange}
        />
      </div>
    );
  }
}
