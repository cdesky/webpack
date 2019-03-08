import { Layout, Menu, Icon, message } from "antd";
import history from "router/history";
const { Header } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //第一次进来的时候默认选中第一个
    let nav = JSON.parse(window.sessionStorage.getItem("menuList"));
    if (nav === null) {
      message.error("找不到相应页面，返回登录页");
      setTimeout(() => {
        history.push("/");
      }, 2000);
      return;
    }
    this.props.content(nav[0].children);
  }

  //加载它的子级
  getChildren(url) {
    window.sessionStorage.setItem("leftMenu", JSON.stringify(url));
    this.props.content(url);
  }

  render() {
    console.log("header");
    let nav = JSON.parse(window.sessionStorage.getItem("menuList"));

    let navRes =
      nav &&
      nav.map((val, i) => {
        return (
          <Menu.Item key={i + 1} onClick={() => this.getChildren(val.children)}>
            <Icon type={val.icon} />
            {val.name}
          </Menu.Item>
        );
      });
    return (
      <Header className="header">
        <div className="logo">webpack</div>
        <Icon
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={() => this.props.toggle()}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          {navRes}
        </Menu>
      </Header>
    );
  }
}

export default Index;
