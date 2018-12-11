 
import "./home.css";
import img from "assets/images/upload.png";
 
let i=0
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount(){ 
    axios.get('/api/ccp-web/schedule-plan/list-tab?projectId=c9336aa1fb2e11e79676000c29087164')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('/api/ccp-web/risk/projectSiteDataList',{
      "projectId":"c9336aa1fb2e11e79676000c29087164",
      "projectSiteId":"ff8080816101ea35016101f768420004"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  add(){ 
    this.setState({
      count:++i
    })
  }
  minus(){ 
   if(this.state.count>0)
    this.setState({
      count:--i
    })
    else
    this.setState({
      count:0
    })
  }

  render() { 
    return (
      <div className="home">
        欢迎来到首页~
        <i className="demo-icon icon-note">&#xe800;</i> 
          
        <a href="javascript:;" onClick={this.add.bind(this)}>
          加
        </a>
        <a href="javascript:;" onClick={this.minus.bind(this)}>
          减
        </a> 
        <span>{this.state.count}</span>
        <img src={img} />
      </div>
    );
  }
}
