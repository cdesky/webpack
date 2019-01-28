import getRouter from "router/router";

if (module.hot) {
  //更改的区域才刷新
  module.hot.accept();
}
ReactDom.render(getRouter(), document.getElementById("app"));
