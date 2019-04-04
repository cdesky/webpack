import { Layout, Menu, Icon } from "antd";
import history from "router/history";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedItem: null };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (window.sessionStorage.getItem("currentUrl")) {
        let url = window.sessionStorage.getItem("currentUrl");
        let len = url.split("/").length,
          pathname = url.split("/");
        let selectedKey = pathname[len - 1];
        this.setState({
          selectedItem: selectedKey
        });
      } else {
        let len = history.location.pathname.split("/").length,
          pathname = history.location.pathname.split("/");
        let selectedKey = pathname[len - 1];
        this.setState({
          selectedItem: selectedKey
        });
      }
    }
  }

  currentPos = url => {
    window.sessionStorage.setItem("currentUrl", url);
  };

  render() {
    // let siderBar = this.props.content;
    let siderBar = window.sessionStorage.getItem("leftMenu")
      ? JSON.parse(window.sessionStorage.getItem("leftMenu"))
      : this.props.content;
    console.log("sider 回调在render");

    return (
      <Sider
        width={180}
        style={{ background: "#fff" }}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={["sub1"]}
          selectedKeys={[this.state.selectedItem]}
          style={{ height: "100%", borderRight: 0 }}
          forceSubMenuRender={true}
        >
          {siderBar &&
            siderBar.map((val, y) => {
              if (val.children.length > 0) {
                return (
                  <SubMenu
                    key={"sub" + (y + 1)}
                    title={
                      <span>
                        <Icon type={val.icon} />
                        {val.name}
                      </span>
                    }
                  >
                    {val.children &&
                      val.children.map(x => {
                        return (
                          <Menu.Item
                            key={x.code}
                            onClick={() => this.currentPos(x.url)}
                          >
                            <Link to={x.url}>{x.name}</Link>
                          </Menu.Item>
                        );
                      })}
                  </SubMenu>
                );
              } else {
                return (
                  <Menu.Item key={val.code}>
                    <Link to={val.url}>{val.name}</Link>
                  </Menu.Item>
                );
              }
            })}
        </Menu>
      </Sider>
    );
  }
}

export default Index;
