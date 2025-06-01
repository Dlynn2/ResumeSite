import Home from "./components/Home";
import Inspiration from "./components/inspiration/Inspirations";
import Experience from "./components/Experience";
import { RouteObject } from 'react-router-dom';
import TabbedGauge from './components/Gauge';
import Analytics from "./components/Analytics/Analytics";

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
  {
    path: '/analytics',
    id: 'Analytics',
    element: <Analytics />
  },
];

export default AppRoutes;