import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/futebolderobo/__docusaurus/debug',
    component: ComponentCreator('/futebolderobo/__docusaurus/debug', 'cb6'),
    exact: true
  },
  {
    path: '/futebolderobo/__docusaurus/debug/config',
    component: ComponentCreator('/futebolderobo/__docusaurus/debug/config', '01b'),
    exact: true
  },
  {
    path: '/futebolderobo/__docusaurus/debug/content',
    component: ComponentCreator('/futebolderobo/__docusaurus/debug/content', '2e9'),
    exact: true
  },
  {
    path: '/futebolderobo/__docusaurus/debug/globalData',
    component: ComponentCreator('/futebolderobo/__docusaurus/debug/globalData', '892'),
    exact: true
  },
  {
    path: '/futebolderobo/__docusaurus/debug/metadata',
    component: ComponentCreator('/futebolderobo/__docusaurus/debug/metadata', '57f'),
    exact: true
  },
  {
    path: '/futebolderobo/__docusaurus/debug/registry',
    component: ComponentCreator('/futebolderobo/__docusaurus/debug/registry', 'f81'),
    exact: true
  },
  {
    path: '/futebolderobo/__docusaurus/debug/routes',
    component: ComponentCreator('/futebolderobo/__docusaurus/debug/routes', 'b3b'),
    exact: true
  },
  {
    path: '/futebolderobo/',
    component: ComponentCreator('/futebolderobo/', 'ac0'),
    routes: [
      {
        path: '/futebolderobo/',
        component: ComponentCreator('/futebolderobo/', '0c3'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/futebolderobo/intro',
        component: ComponentCreator('/futebolderobo/intro', 'ed9'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
