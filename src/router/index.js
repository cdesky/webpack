import { Layout, Table } from "antd";
import Header from "component/header/index";
import Sider from "component/Sider/index";
// import Body from "component/Sider/body";
// import {Router as HashRouter,Switch,Route } from "react-router-dom";

// import hashHistory from "router/history";
const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {}

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
      body: null
    });
  }

  content(val) {
    this.setState({
      body: val //<Route path={val} component={val}/>
    });
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
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User" // Column configuration not to be checked
      })
    };

    let year = ["费用科目", "合计", "2018汇总", "2019汇总", "2020汇总"];
    const columns = [];

    for (let i = 0; i < year.length; i++) {
      if (year[i] == "费用科目")
        {
          console.log('"first" + i',"first" + i)
          columns.push({
            // width: 100,
            title: year[i],
            dataIndex: "first",
            key: "first"+i,
            fixed: "left",
            className:'firstCol',
            render: val => {
              return <span onClick={() => alert(0)}>{val}</span>;
            }
          });
        }
      else
        {
          console.log('"aa" + i',"aa" + i)
          console.log('"buget" + i',"buget" + i)
          console.log('"upbuget" + i',"upbuget" + i)
          console.log('"fact" + i',"fact" + i)
          columns.push({
            dataIndex: "first",
            key: "first"+i,
            title: year[i],
            width:240,
            children: [
              {
                width: 80,
                title: "预算",
                dataIndex: "buget",
                key: "buget"+i
              },
              {
                width: 80,
                title: "更新预算",
                dataIndex: "upbuget",
                key: "upbuget"+i
              },
              {
                width: 80,
                title: "实际",
                dataIndex: "fact",
                key: "fact"+i
              }
            ]
          });
        }
        console.log('columns',columns)
    }

    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({ 
        first: "site费用" + i,
        buget: "111",
        upbuget: "222",
        fact: "333",
        key:'data'+i,
        children:[{ 
          first: "经费" + i,
          buget: "aaa",
          upbuget: "bbb",
          fact: "ccc", 
          key:'child'+i
        }]
      });
      console.log('data',data)
    }

    return (
      <Layout style={{ height: "100%" }}>
        <Header toggle={() => this.toggle()} collapsed={this.state.collapsed} />
        <Layout style={{ height: "100%" }}>
          <Sider
            collapsed={this.state.collapsed}
            content={x => this.content(x)}
          />
          {/* <Body body={this.state.body}/>
          
          <Sider collapsed={this.state.collapsed} /> */}
          <Content
            style={{
              margin: "10px",
              padding: "10px",
              background: "#fff",
              borderRadius: 4
            }}
          >
            {/* <HashRouter history={hashHistory}><Switch>{this.state.body}</Switch></HashRouter> */}
            <Table
              rowSelection={rowSelection}
              rowKey="tables"
              bordered
              columns={columns}
              dataSource={data}
              size="middle"
              scroll={{ x: "130%", y: 300 }}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
