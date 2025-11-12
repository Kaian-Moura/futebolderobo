import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
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
