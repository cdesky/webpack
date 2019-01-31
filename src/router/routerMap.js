import Ac from "component/AsyncComponent";

export default {
  login: Ac(() => import("pages/login/login")),
  app: Ac(() => import("component/Body/index")),
  project: Ac(() => import("pages/project/project")),
  site: Ac(() => import("pages/site/site")),
  projectDetail: Ac(() => import("pages/project/view/projectDetail")),
  table: Ac(() => import("pages/project/view/projectTb"))
};
