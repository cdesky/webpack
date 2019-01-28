import Ac from "component/AsyncComponent";

export default {
  App: Ac(() => import("component/Body/index")),
  project: Ac(() => import("pages/project/project")),
  site: Ac(() => import("pages/site/site")),
  projectDetail: Ac(() => import("pages/project/view/projectDetail")),

};
