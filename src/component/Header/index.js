import { Layout, Menu, Icon } from "antd";
const { Header } = Layout;
class Index extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  componentDidMount(){
    let nav = JSON.parse(window.sessionStorage.getItem("menuList"));
    console.log(nav[0].children)
    window.sessionStorage.setItem('leftMenu',JSON.stringify(nav[0].children))
    
  }

  //加载它的子级
  getChildren(url) {
    window.sessionStorage.setItem('leftMenu',JSON.stringify(url))
  }

  render() {
    let nav = JSON.parse(window.sessionStorage.getItem("menuList"));
    let navRes = nav.map((val, i) => {
      return (
        <Menu.Item key={i + 1} onClick={() => this.getChildren(val.children)}>
          <Icon type="user" />
          {val.name}
        </Menu.Item>
      );
    });
    return (
      <Header className="header">
        <div className="logo">冬哥</div>
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
