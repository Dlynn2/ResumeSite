import { Counter } from "./components/Counter.tsx";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home.tsx";
import { About } from "./components/About.tsx"
import { Experience } from "./components/Experience"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/experience',
    element: <Experience />
  },
];

export default AppRoutes;
