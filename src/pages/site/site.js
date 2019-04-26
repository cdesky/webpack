import "./site.css";
import { DatePicker } from "antd";
// import { publicPath } from "../../../baseConfig.js";

export default class Site extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let alipay =
      "https://pan-test.mobilemd.cn/landocview?target=aHR0cDovLzE5Mi4xNjguMTA0LjE0MDo4MC9kb2N2aWV3L2VkYjM4MWI3YmYyNzNjMTllYmMxOTBkMzlhYjdiYzViNmM3NDFhOTBfMzBfMi5wZGY%3d";
    return (
      <div className="site">
        this is site2~
        <a href="javascript:window.history.back(-1)">返回</a>
        <DatePicker />
        <iframe
          src={`./assets/webpdf/viewer.html${alipay}`}
          width="100%"
          height="90%"
          className="viewImg"
          scrolling="no"
        >
          &nbsp;
        </iframe>
      </div>
    );
  }
}
