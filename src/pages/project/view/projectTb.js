import { Table } from "antd";
import dataList from "../dataList";

export default class ProjectTb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData:[]
     };
  }

  componentDidMount() {
   this.setState({
     tableData:dataList
   })
  }

  getTable = () =>{
    let ary=[];
    let same=[];
    this.state.tableData.forEach(a=>{
      same.push(a.year);
    })
    let resYear=Array.from(new Set(same));

    resYear.forEach((x,index)=>{
      let head=[];
      let body=[];
      this.state.tableData.forEach(b=>{
        if(x===b.year)
        {
          head.push({
            key:b.id,
            title:b.month+'月',
            key:b.id,
            dateIndex:b.month
          })
        }
      })

      

      ary.push(<Table 
              id={'tb'+index}
              columns={head}
              dataSource={body}
              pagination={false}
              />)
    })

    return ary;
  }

  render() {
    return (
      this.getTable()
    );
  }
}
