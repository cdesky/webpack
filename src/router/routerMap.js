import Ac from "component/AsyncComponent";

export default {
  IndexBody: Ac(() => import("router/index")),
  // project: Ac(() => import("pages/project/project")),
  // site: Ac(() => import("pages/site/site")),
  // projectDetail: Ac(() => import("pages/project/view/projectDetail")),


  p_schedule:Ac(()=> import("pages/project/project")),
  s_sitePlan:Ac(()=> import("pages/site/site"))
};
