import { Layout } from "antd";
import Header from "component/header/index";
import Sider from "component/Sider/index";
// import Body from "component/Sider/body";
import {Router as HashRouter,Switch,Route } from "react-router-dom";

import hashHistory from "router/history";
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
      body:<Route path={val} component={val}/>
    })
  }

  render() { 
    return (
      <Layout style={{ height: "100%" }}>
        <Header toggle={() => this.toggle()} collapsed={this.state.collapsed} />
        <Layout style={{ height: "100%" }}>
          <Sider collapsed={this.state.collapsed} content={(x)=>this.content(x)}/>
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
            <HashRouter history={hashHistory}><Switch>{this.state.body}</Switch></HashRouter>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
