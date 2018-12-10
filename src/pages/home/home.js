 
import "./home.css";
import img from "assets/images/upload.png";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  render() { 
    return (
      <div className="home">
        欢迎来到首页~
        <i class="demo-icon icon-note">&#xe800;</i> 
        <button type="button" onClick={this.add}>
          加
        </button>
        <img src={img} />
      </div>
    );
  }
}
