import "./site.css";
import { DatePicker } from "antd";
import { publicPath } from "../../../baseConfig.js";

export default class Site extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let alipay =
      "https://pan-test.mobilemd.cn/landocview?target=aHR0cDovLzE5Mi4xNjguMTA0LjE0MDo4MC9kb2N2aWV3LzJhNDAxNWI0Yjg2MDk5NDE0MmU3NzE4NGZjMWY0YTkxZWJmNjUzMmFfMzBfMi5wZGY%3d";
    return (
      <div className="site">
        {console.log('this.props.location',this.props.location)}
        this is site2~
        <a href="javascript:window.history.back(-1)">返回</a>
        <DatePicker />
        <iframe
          src={`${publicPath}/assets/webpdf/viewer.html${alipay}`}
          width="100%"
          height="90%"
          className="viewImg"
          scrolling="no"
        />

        <iframe
          src={`${publicPath}/src/assets/webpdf/viewer.html${alipay}`}
          width="100%"
          height="90%"
          className="viewImg"
          scrolling="no"
        />
      </div>
    );
  }
}
