 
import "./home.css";
import img from "assets/images/upload.png";

let i=0
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: null
    };
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
        <i class="demo-icon icon-note">&#xe800;</i> 
          
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
