import { Layout, Menu, Icon } from "antd";
import history from "router/history";

const { SubMenu } = Menu;
const { Sider } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: 1,
      bar: null
    };
  }

  componentDidMount() {
    // if(this.props.content)
    //   this.SelectedKeys(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    setTimeout(() => {
      this.SelectedKeys(this.state.selectedKey);
    }, 100);
  }

  SelectedKeys(count) {
    this.setState({
      selectedKey: count,
      bar: this.props.content
    });
  }

  st(a,b,c){
    console.log('aaaa',a,b,c)
    // this.setState({
    //   selectedKey: num,
    // });
  }

 
  jumpTo(url,num) {
    history.push(url);

    this.setState({
      selectedKey:num
    })
  }

  render() {
    console.log("sider");
    let bar = this.state.bar;
    let selectedKey = this.state.selectedKey;
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
          // defaultSelectedKeys={["child" + selectedKey]}
          defaultOpenKeys={["sub1"]} 
          selectedKeys={["child"+selectedKey]}
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
                      return (
                        <Menu.Item
                          key={"child" + count}
                          // onClick={() => this.jumpTo(x.url)}
                          onSelect={()=> this.st(x.url,count,key)}
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
