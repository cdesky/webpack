import {Layout, Menu, Icon} from 'antd';
const { Header } = Layout;
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
        <Header className="header">
            <div className="logo">冬哥</div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
            {navRes}
            </Menu>
        </Header>  
    );
  }     
}

export default Index;
