import EventList from "../pages/EventList/EventList"
import FilterEvents from "../pages/FilterEvents/FilterEvents"
import EventDetail from "../pages/EventDetails/EventDetails"
import Login from "../pages/Login/Login"
import RoleSelect from "../pages/Signup/RoleSelect/RoleSelect"
import Signup from "../pages/Signup/SignUp/Signup"

import OrganizerWelcome from '../pages/OrganizerWelcome/OrganizerWelcome';
import CreateEventForm from "../pages/CreateEventForm/CreateEventForm"
// import EventDetailPage from "../pages/EventDetailPage/EventDetailPage"
import OrganizerDetails from "../pages/OrganizerDetails/OrganizerDetails"
import EventPageCreation from '../pages/EventPageCreation/EventPageCreation';



export const routes = [
  {path:'/',element:<EventList/>},
  {path:'/find-events',element:<FilterEvents/>},
  {path:'/events/:id',element:<EventDetail/>},
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <RoleSelect /> },
  { path: '/signup/:role', element: <Signup /> }, 
  { path: '/organizer-welcome', element: <OrganizerWelcome /> },
  { path: '/create-event-form', element: <CreateEventForm /> },
  { path: '/organizer-details', element: <OrganizerDetails /> },
  { path: '/events/:id', element: <EventPageCreation /> },


  
  
];