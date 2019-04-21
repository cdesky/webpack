import "./site.css";
import { DatePicker } from "antd"; 

export default class Site extends Component {
  constructor(props) {
    super(props);
    
  }

 

  render() {
    return (
      <div className="site">
        this is site2~ 
        <a href="javascript:window.history.back(-1)">返回</a>
       
        <DatePicker />
      </div>
    );
  }
}
