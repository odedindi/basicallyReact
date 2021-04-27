// @material-ui/icons
import Person from "@material-ui/icons/Person";
import ControlPoint from "@material-ui/icons/ControlPoint";
import TrendingUp from "@material-ui/icons/TrendingUp";
import TrendingDown from "@material-ui/icons/TrendingDown";
import Home from "@material-ui/icons/Home";
// core components/views for Admin layout

import DashboardPage from "./views/Dashboard/Dashboard.jsx";
import UserProfile from "./views/UserProfile/UserProfile.jsx";
import TableList from "./views/TableList/TableList.jsx";
import EarthMeasurement from './views/NewProject';
import VoltageProfile from './views/VoltageProfile/VoltageProfile.jsx';
import Beruehrungsspannung from './views/TouchVoltage';
import MapsAndGraphsReport from './views/FinalReport/mapsAndGraphs';
import FinalReport from "./views/FinalReport/index.jsx";


const dashboardRoutes = [

  {
    path: "/start",
    name: "Start",
    icon: Home,
    component: DashboardPage,
    layout: "/demo"
  },
  {
    path: "/new-project",
    name: "New Project",
    icon: ControlPoint,
    component: EarthMeasurement,
    layout: "/demo"
  },
  {
    path: "/touch-voltage",
    name: "Touch Voltage",
    icon: TrendingUp,
    component: Beruehrungsspannung,
    layout: "/demo"
  },
  {
    path: "/voltage-profile",
    name: "Voltage Profile",
    icon: TrendingDown,
    component: VoltageProfile,
    layout: "/demo"
  },
  {
    path: "/report/",
    name: "Report",
    icon: "content_paste",
    component: FinalReport,
    layout: "/demo"
  },
  {
    path: "/reports-map",
    name: "Maps&Graphs Report",
    icon: TrendingUp,
    component: MapsAndGraphsReport,
    layout: "/demo"
  },
  {
    path: "/messungen",
    name: "Exported Reports",
    icon: "content_paste",
    component: TableList,
    layout: "/demo"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/demo"
  },
];

export default dashboardRoutes;
