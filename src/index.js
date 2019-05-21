import App from "router/router";
import { LocaleProvider } from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

if (module.hot) {
  //更改的区域才刷新
  module.hot.accept();
}
ReactDom.render(<LocaleProvider locale={'en_US'}><App /></LocaleProvider>, document.getElementById("app"));
