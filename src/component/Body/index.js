import { Layout,  } from "antd";//Spin
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
      initDone: false
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
    // debugger;
    if (nextProps) {
      // let url = window.sessionStorage.getItem("currentUrl");
      // if (url) {
      //   let len = url.split("/").length,
      //     pathname = url.split("/");
      //   let code = pathname[len - 1]; //获取到点击的是哪个导航  然后去跳转相应的页面
      //   this.setState({
      //     code: code
      //   });
      // }

      let len = history.location.pathname.split("/").length,
      pathname = history.location.pathname.split("/");
      let code = pathname[len - 1];
      this.setState({
        code: code
      });
      this.setState({ initDone: true });
    }
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  //拿到父级点击返回的左侧树
  content(val) {
    this.props.history.push(window.sessionStorage.getItem("currentUrl"));

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
            {/* <Spin spinning={this.state.initDone}> */}
              <Route component={RouterMap[this.state.code]} />
            {/* </Spin> */}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
