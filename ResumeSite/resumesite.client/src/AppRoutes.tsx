import Home from "./components/Home";
import Inspiration from "./components/Inspirations";
import Experience from "./components/Experience";
import { RouteObject } from 'react-router-dom';
import TabbedGauge from './components/Gauge';

const AppRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/skills',
    id: 'Skills',
    element: <TabbedGauge />
  },
  {
    path: '/inspiration',
    id: 'Inspiration',
    element: <Inspiration />
  },
  {
    path: '/experience',
    id: 'Experience',
    element: <Experience />
  },
];

export default AppRoutes;