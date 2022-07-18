import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import { PersonAdd } from '@mui/icons-material';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';

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
  {
    title: 'Admission',
    path: '/dashboard/admission',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Certificate',
    path: '/dashboard/certificate',
    icon: getIcon(peopleFill)
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
