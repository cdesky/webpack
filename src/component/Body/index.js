import { Layout } from "antd";
import Header from "component/header/index";
import Sider from "component/Sider/index";
import { Route } from "react-router-dom";
import RouterMap from "router/routerMap";
import history from "router/history";

const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      body: null
    };
  }

  componentDidMount() {}

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  //拿到父级点击返回的左侧树
  content(val) {
    this.setState({
      body: val
    });
    if (val) {
      let url = val[0].children[0] ? val[0].children[0].url : val[0].url;
      history.push(url);
    }
  }

  render() {
    console.log("router",this.props.location.pathname.split("/")[2]);

    return (
      <Layout style={{ height: "100%" }}>
        <Header
          toggle={() => this.toggle()}
          collapsed={this.state.collapsed}
          content={x => this.content(x)}
        />
        <Layout style={{ height: "100%" }}>
          <Sider collapsed={this.state.collapsed} content={this.state.body} count={1}/>

          <Content
            style={{
              margin: "10px",
              padding: "10px",
              background: "#fff",
              borderRadius: 4
            }}
          >
            <Route
              component={RouterMap[this.props.location.pathname.split("/")[2]]}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
