import Ac from 'component/AsyncComponent';

export default { 
    login: Ac(() => import('pages/login/login')),
    home: Ac(() => import('pages/home/home')),
    project: Ac(() => import('pages/project/project')),
    site: Ac(() => import('pages/site/site')),
    projectDetail: Ac(() => import('pages/project/view/projectDetail'))
  
};