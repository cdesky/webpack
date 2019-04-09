import { Layout, Spin } from "antd";
import Header from "component/header/index";
import Sider from "component/Sider/index";
import { Route } from "react-router-dom";
import RouterMap from "router/routerMap";
import history from "router/history";
import intl from "react-intl-universal";
import langs from "../../cn.json";
const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      body: null,
      code: null,
      initDone: true
    };
  }

  componentDidMount() {
    //国际化初始
    intl.init({
      currentLocale: "zh-CN",
      locales: { "zh-CN": langs }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (window.sessionStorage.getItem("currentUrl")) {
        let url = window.sessionStorage.getItem("currentUrl");
        let len = url.split("/").length,
          pathname = url.split("/");
        let code = pathname[len - 1]; //获取到点击的是哪个导航  然后去跳转相应的页面
        this.setState({
          code: code
        });
      } else {
        let len = history.location.pathname.split("/").length,
          pathname = history.location.pathname.split("/");
        let code = pathname[len - 1];
        this.setState({
          code: code
        });
      }
      this.setState({ initDone: false });
    }
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  //拿到父级点击返回的左侧树
  content(val) {
    let url = "";
    if (val) {
      url = val[0].children[0] ? val[0].children[0].url : val[0].url;
      history.push(url);
    }

    this.setState({
      body: val
    });
  }

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Header
          toggle={() => this.toggle()}
          collapsed={this.state.collapsed}
          content={x => this.content(x)}
        />
        <Layout style={{ height: "100%" }}>
          <Sider collapsed={this.state.collapsed} content={this.state.body} />
          <Content
            style={{
              margin: "10px",
              padding: "10px",
              background: "#fff",
              borderRadius: 4
            }}
          >
            <Spin spinning={this.state.initDone}>
              <Route component={RouterMap[this.state.code]} />
            </Spin>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
