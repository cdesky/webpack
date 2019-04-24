import { Table } from "antd";
import tableData from "./table.json";

export default class ProjectTb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const renderContent = (value) => {
    //   const obj = {
    //     children: value,
    //     props: {}
    //   };
    //   // if (index === 4) {
    //   //   obj.props.colSpan = 0;
    //   // }
    //   return obj;
    // };

    const columns = [
      {
        key:'ff1',
        title: "一级任务",
        dataIndex: "firstTask",
        // colSpan: 2,
        children:[{
          key:'f1',
          title:"任务名称",
          dataIndex:"FlevelTaskName",
          render:(value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            if(index===0)
              obj.props.rowSpan=4;
            
              return obj;
          }
           
        },
        {
          key:'f2',
          title:"合计",
          dataIndex:"FtotalHours"
        }]
        // render: (text, row, index) => {
        //   // return <a href="javascript:;">{text}</a>;
        //   if (index < 4) {
        //     return <a href="javascript:;">{text}</a>;
        //   }
        //   return {
        //     children: <a href="javascript:;">{text}</a>,
        //     // props: {
        //     //   colSpan: 5
        //     // }
        //   };
        // }
      },
      {
        key:'ff2',
        title: "二级任务",
        dataIndex: "secondTask",
        // colSpan: 2,
        children:[{
          key:'s1',
          title:"任务名称",
          dataIndex:"SlevelTaskName"
        },
        {
          key:'s2',
          title:"合计",
          dataIndex:"StotalHours"
        }],
        // render:(value, row, index) => {
        //   const obj = {
        //     children: value,
        //     props: {},
        //   };
        //   if(index===0)
        //     obj.props.rowSpan=4;
          
        //     return obj;
        // }
      },
      {
        key:'ff3',
        title: "三级任务",
        // colSpan: 3,
        dataIndex: "thirdTask",
        children:[{
          key:'t1',
          title:"任务名称",
          dataIndex:"TlevelTaskName",
          // render:(value, row, index) => {
          //   const obj = {
          //     children: value,
          //     props: {},
          //   };
          //   if(index===0)
          //     obj.props.rowSpan=4;
            
          //     return obj;
          // }
        },
        {
          key:'t2',
          title:"合计",
          dataIndex:"TtotalHours"
        },
        {
          key:'t3',
          title:"部门",
          dataIndex:"TdeptName"
        }]
       
      }
    ];

    const data =tableData;

    return <Table columns={columns} dataSource={data} bordered defaultExpandAllRows={true}/>;
  }
}
