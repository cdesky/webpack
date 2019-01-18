import Ac from 'component/AsyncComponent';

export default { 
    IndexBody: Ac(() => import('router/index')),
    login: Ac(() => import('pages/login/login')), 
    project: Ac(() => import('pages/project/project')),
    site: Ac(() => import('pages/site/site')),
    projectDetail: Ac(() => import('pages/project/view/projectDetail'))
  
};