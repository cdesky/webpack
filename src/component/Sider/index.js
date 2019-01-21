// import { Route } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
const { SubMenu } = Menu;
const { Sider } = Layout;


class Index extends Component {
  constructor(props) {
    super(props);
  }

  jumpTo(code){ 
    this.props.content(code)
  }

  render() {
    let bar=JSON.parse(window.sessionStorage.getItem('leftMenu'))
 
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
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
        {
          bar&&bar.map((val,y)=>{
            return <SubMenu
                    key={'sub'+(y+1)}
                    title={
                      <span>
                        <Icon type="user" />
                        {val.name}
                      </span>
                    }
                  >
                    {
                      val.children&&val.children.map((x,i)=>{
                        return <Menu.Item key={'bar'+i} onClick={()=>this.jumpTo(x.url)}>{x.name}</Menu.Item>
                      })
                    }
                </SubMenu>
          })
        }
          
        </Menu>
      </Sider>
    );
  }
}

export default Index;
