 
import {Button} from 'antd';
import "./home.css";
import img from "assets/images/upload.png";
import PickerColor from 'component/pickerColor/index'

let i=0
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount(){ 
    axios.get('/php/test.php', 
    {
      params:{
        userName:'111',
        pwd:'123456'
      },
      //设置请求头  
      headers: {'TM-Header-Request-Source': 'CCP-WEB'},
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
          <Button type='primary'>保存</Button>
        <a href="javascript:;" onClick={this.add.bind(this)}>
          加
        </a>
        <a href="javascript:;" onClick={this.minus.bind(this)}>
          减
        </a> 
        <span>{this.state.count}</span>
        <img src={img} />
        <br/>
        <PickerColor />

        
      </div>
    );
  }
}
