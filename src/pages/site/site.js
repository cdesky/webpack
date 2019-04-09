import "./site.css";
import { DatePicker } from "antd";

export default class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Number: 1
    };
  }

  //这里调用了setState但是并没有改变setState中的值
  handleClick = () => {
    let a = this.state.Number;
    this.setState({
      Number: this.state.Number
    },()=>{
      this.setState({
        Number: a++
      })
    });
  };
  //在render函数调用前判断：如果前后state中Number不变，通过return false阻止render调用
  shouldComponentUpdate(nextProps, nextState) {
    debugger;
    if (nextState.Number === this.state.Number) {
      return false;
    }
  }

  render() {
    //当render函数被调用时，打印当前的Number
    console.log(this.state.Number);
    return (
      <div className="site">
        this is site2~
        <h2
          href="javascript:;"
          onClick={this.handleClick}
          style={{ margin: 30 }}
        >
          {this.state.Number}
        </h2>
        <DatePicker />
      </div>
    );
  }
}
