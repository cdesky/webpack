import {Layout, Menu, Icon} from 'antd';
import SiderBar from 'component/Sider'
const { Header, Sider, Content } = Layout;
class Index extends Component {
   constructor(){
       super();
       this.state = {
        collapsed: false,
        rightCon:null
      };
   }

      toggle(){
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }

      //加载它的子级
      getChildren(url){
          this.setState({
              rightCon:url
          })
      }

  render() {
    let nav=JSON.parse(window.localStorage.getItem('menuList'));
    let navRes=nav.data.map((val,i)=>{
        return <Menu.Item key={i+1} onClick={()=>this.getChildren(val.url)}>
              <Icon type="user" />{val.name} 
            </Menu.Item> 
    })
    return (
        <Layout>
    <Header className="header">
      <div className="logo"/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
       {navRes}
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <SiderBar /> 
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        
        <Content style={{
          background: '#fff', padding: 24, margin: 0, minHeight: 280,
        }}
        >
          更改这个页面就行了112
        </Content>
      </Layout>
    </Layout>
  </Layout>
    );
  }     
}

export default Index;
