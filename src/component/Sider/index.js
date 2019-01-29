import { Layout, Menu, Icon } from "antd";
import history from "router/history";

const { SubMenu } = Menu;
const { Sider } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ss: this.props.count
    };
  }

  componentDidMount() {}

  componentWillUpdate(){
    console.log(0)
    // this.setState({
    //   ss:1
    // })
  }

  componentDidUpdate(){
    console.log(1)
    // this.setState({
    //   ss:1
    // })
  }
  
  jumpTo(url) {
    history.push(url);
  }

  render() {
    console.log("sider");
    let bar = this.props.content;
    let count = 0;
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
          defaultSelectedKeys={["child" + this.state.ss]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          {bar &&
            bar.map((val, y) => {
              return (
                <SubMenu
                  key={"sub" + (y + 1)}
                  title={
                    <span>
                      <Icon type="user" />
                      {val.name}
                    </span>
                  }
                >
                  {val.children &&
                    val.children.map(x => {
                      count++;
                      console.log("count", count);
                      return (
                        <Menu.Item
                          key={"child" + count}
                          onClick={() => this.jumpTo(x.url)}
                        >
                          {x.name}
                        </Menu.Item>
                      );
                    })}
                </SubMenu>
              );
            })}
        </Menu>
      </Sider>
    );
  }
}

export default Index;
