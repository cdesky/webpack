import { Layout } from "antd";
import Header from "component/header/index";
import Sider from "component/Sider/index";
import Body from "component/Sider/body";
// import {Switch,Route } from "react-router-dom";
// import routerMap from "./routerMap";
// import getRouter from "./router"
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
      body:null
    });
  }

  content(val){ 
    this.setState({
      body:val
    })
  }

  render() {
    // let keys=this.state.body;
    return (
      <Layout style={{ height: "100%" }}>
        <Header toggle={() => this.toggle()} collapsed={this.state.collapsed} />
        <Layout style={{ height: "100%" }}>
          <Sider collapsed={this.state.collapsed} content={(x)=>this.content(x)}/>
          <Body body={this.state.body}/>
          
        </Layout>
      </Layout>
    );
  }
}

export default Index;
