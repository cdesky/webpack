import { Layout, Menu, Icon, message, Dropdown } from "antd";
import history from "router/history";
import intl from 'react-intl-universal';
import cn from '../../cn.json';
import en from '../../en.json';

const { Header } = Layout;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {initDone:false};

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
    window.sessionStorage.setItem("leftMenu", JSON.stringify(url)); //左侧子级菜单
    window.sessionStorage.setItem("currentUrl", url[0].children[0].url); //当前点击的路径
    window.sessionStorage.setItem("currentPos", url[0].sort); //在第几个主导航
    this.props.content(url);
  }

  logout = () => {
    window.sessionStorage.clear();
    history.push("/");
  };

  //切换语言
  changeLang = (lang) =>{
    //国际化初始
    intl.init({
      currentLocale: lang,
      locales:{[lang]:lang==='zh-CN'?cn:en},
    })
    this.setState({initDone: true});
    this.getChildren(JSON.parse(window.sessionStorage.getItem('menuList'))[0].children);
  }

  render() {
    console.log("header");
    let nav = JSON.parse(window.sessionStorage.getItem("menuList"));
    let pos = window.sessionStorage.getItem("currentPos")
      ? window.sessionStorage.getItem("currentPos")
      : "1";

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

    const menu = (
      <Menu>
        <Menu.Item onClick={() => this.changeLang("zh-CN")}>中文</Menu.Item>
        <Menu.Item onClick={() => this.changeLang("en-US")}>英文</Menu.Item>
      </Menu>
    );
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
          defaultSelectedKeys={[pos]}
          style={{ lineHeight: "64px" }}
        >
          {navRes}
        </Menu>

        <div className="appAction">
          <Dropdown overlay={menu} placement="topRight">
            <Icon type="global" title='切换语言'/>
          </Dropdown>
          &nbsp;&nbsp;
          <Icon type="logout" onClick={this.logout} title="退出" />
        </div>
      </Header>
    );
  }
}

export default Index;