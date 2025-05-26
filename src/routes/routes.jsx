import EventList from "../pages/Home"
import FilterEvents from "../pages/FilterEvents/FilterEvents"
import EventDetail from "../pages/EventDetails"
import Login from "../pages/Login"
import RoleSelect from "../pages/Signup/RoleSelect"
import Signup from "../pages/Signup/Signup"
import OrganizerWelcome from '../pages/OrganizerWelcome';
import CreateEventForm from "../pages/CreateEventForm/CreateEventForm"
import OrganizerDetails from "../pages/OrganizerDetails"
import EventPageCreation from '../pages/EventPageCreation/EventPageCreation';
import Dashboard from "../pages/OrganizerDashboard/Dashboard/Dashboard"
import EventSpeakersVendors from "../pages/EventSpeakersVendors"
import HelpCentre from "../pages/HelpCentre"




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
  { path: '/find-speaker-vendor', element: <EventSpeakersVendors /> },
  { path: '/help-centre', element: <HelpCentre /> },


  
  
];