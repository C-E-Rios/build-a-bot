import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';

import SidebarStandard from '../sidebars/SidebarStandard.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';

import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBases from '../parts/RobotBases.vue';

import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: HomePage,
        sidebar: SidebarStandard,
      },
    },
    {
      path: '/build',
      name: 'Build',
      components: {
        default: RobotBuilder,
        sidebar: SidebarBuild,
      },
    },
    {
      path: '/parts/browse',
      name: 'BrowseParts',
      components: {
        default: BrowseParts,
        sidebar: SidebarBuild,
      },
      children: [
        {
          path: 'heads',
          name: 'BrowseHeads',
          component: RobotHeads,
        },
        {
          path: 'arms',
          name: 'BrowseArms',
          component: RobotArms,
        },
        {
          path: 'torsos',
          name: 'BrowseTorsos',
          component: RobotTorsos,
        },
        {
          path: 'bases',
          name: 'BrowseBases',
          component: RobotBases,
        },
      ],
    },
    {
      name: 'Parts',
      props: true,
      path: '/parts/:partType/:id',
      component: PartInfo,
      beforeEnter(to, from, next) {
        const isValidId = Number.isInteger(Number(to.params.id));
        next(isValidId);
      },
    },
    {
      name: 'cart',
      path: '/cart',
      component: ShoppingCart,
    },
  ],
});
