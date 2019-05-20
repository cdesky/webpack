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
  bbsPublish: Ac(() => import("pages/bbs")),
};
