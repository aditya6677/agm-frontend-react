import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Vehicles',
    path: '/dashboard/list',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Pollutions',
    path: '/dashboard/pucc',
    icon: getIcon(lockFill)
  },
  {
    title: 'Insurance',
    path: '/dashboard/insurance',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Fitness',
    path: '/dashboard/fitness',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Task',
    path: '/dashboard/task',
    icon: getIcon(lockFill)
  },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
