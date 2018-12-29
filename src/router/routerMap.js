import Ac from 'component/AsyncComponent';

export default { 
    home: Ac(() => import('pages/Home/Home')),
    project: Ac(() => import('pages/project/project')),
    site: Ac(() => import('pages/site/site')),
    projectDetail: Ac(() => import('pages/project/view/projectDetail'))
  
};