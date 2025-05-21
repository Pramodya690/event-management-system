import EventList from "../pages/EventList/EventList"
import FilterEvents from "../pages/FilterEvents/FilterEvents"
import EventDetail from "../pages/EventDetails/EventDetails"
import Login from "../pages/Login/Login"
import RoleSelect from "../pages/Signup/RoleSelect/RoleSelect"
import Signup from "../pages/Signup/SignUp/Signup"
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import OrganizerWelcome from '../pages/OrganizerWelcome/OrganizerWelcome';
import CreateEventForm from "../pages/CreateEventForm/CreateEventForm"

export const routes = [
  {path:'/',element:<EventList/>},
  {path:'/find-events',element:<FilterEvents/>},
  {path:'/events/:id',element:<EventDetail/>},
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <RoleSelect /> },
  { path: '/signup/:role', element: <Signup /> }, 
  { path: '/create-event', element: <CreateEvent /> },
  { path: '/organizer-welcome', element: <OrganizerWelcome /> },
  { path: '/create-event-form', element: <CreateEventForm /> },
  
  
];