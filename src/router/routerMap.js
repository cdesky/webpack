import Ac from "component/AsyncComponent";

export default {
  login: Ac(() => import("pages/login/login")),
  app: Ac(() => import("component/Body/index")),
  project: Ac(() => import("pages/project/project")),
  site: Ac(() => import("pages/site/site")),
  dragTr: Ac(() => import("pages/site/dragTr")),
  dragTr2: Ac(() => import("pages/site/dragTr2")),
  projectDetail: Ac(() => import("pages/project/view/projectDetail")),
  table: Ac(() => import("pages/project/view/projectTb")),
  resizeTable: Ac(() => import("pages/project/view/resizeTable")),
  bbs: Ac(() => import("pages/bbs/bbs")), //如果导航是只有2级，那这里要配置3个才能实现选中与跳转页面
  mouseMove: Ac(() => import("pages/project/view/mouseMove")),
};
