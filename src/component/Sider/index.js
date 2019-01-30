import { Layout, Menu, Icon } from "antd";
import history from "router/history";

const { SubMenu } = Menu;
const { Sider } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey: null,
      bar: null
    };
  }

  componentDidMount() {
    this.setState({
      selectedKey: this.props.code
    })
    // if(this.props.content)
      // this.SelectedKeys(this.props.code);
      // setTimeout(() => {
        // this.SelectedKeys(nextProps.code);
        // this.SelectedKeys(this.props.code);
      // }, null);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    this.SelectedKeys(this.state.selectedKey);
  }
 

  SelectedKeys(count) {
    this.setState({
      selectedKey: this.props.code,
      bar: this.props.content
    });
  }

  
 
  jumpTo(url,num) {
    console.log('aaaa',url,num)
    this.setState({
      selectedKey:num
    })
    history.push(url);
  }

  render() {
    console.log("sider 回调在render",this.state.selectedKey);
    let bar =this.props.content// this.state.bar;
    let selectedKey = this.state.selectedKey; 

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
          // defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={["sub1"]} 
          selectedKeys={[selectedKey]}
          style={{ height: "100%", borderRight: 0 }}
          forceSubMenuRender={true}
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
                      return (
                        <Menu.Item
                          key={x.code}
                          onClick={()=> this.jumpTo(x.url,x.code)}
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
