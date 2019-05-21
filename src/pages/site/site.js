import "./site.css";
import { DatePicker, LocaleProvider } from "antd";
import { publicPath } from "../../../baseConfig.js";
import moment from 'moment';
moment.locale('en'); // default the locale to English
moment.locale('en', {
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
}
});

const { WeekPicker } = DatePicker;
export default class Site extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  render() {
   
    let alipay =
      "https://pan-test.mobilemd.cn/landocview?target=aHR0cDovLzE5Mi4xNjguMTA0LjE0MDo4MC9kb2N2aWV3LzJhNDAxNWI0Yjg2MDk5NDE0MmU3NzE4NGZjMWY0YTkxZWJmNjUzMmFfMzBfMi5wZGY%3d";
    return (
      <div className="site">
        {console.log("this.props.location", this.props.location)}
        this is site2~
        <a href="javascript:window.history.back(-1)">返回</a>
        <DatePicker />
        <WeekPicker onChange={this.onChange} />
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
