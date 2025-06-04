import HomePage from "../pages/HomePage"
import FilterEvents from "../pages/FilterEvents/FilterEvents"
import EventDetail from "../pages/EventDetails"
import Login from "../pages/Login"
import Signup from "../pages/Signup/Signup"
import OrganizerWelcome from '../pages/OrganizerWelcome';
import CreateEventForm from "../pages/CreateEventForm/CreateEventForm"
import EventPageCreation from '../pages/EventPageCreation/EventPageCreation';
import EventSpeakersVendors from "../pages/EventSpeakersVendors"
import HelpCentre from "../pages/HelpCentre"
import OrganizerDashboardHome from "../pages/OrganizerDashboard/OrganizerDashboardHome"
import OrganizerDashboardSidebar from "../pages/OrganizerDashboard/OrganizerDashboardSidebar"
import OrganizerCreateEventLanding from "../pages/OrganizerDashboard/OrganizerCreateEventLanding"
import ExhibitionForm from "../pages/OrganizerDashboard/ExhibitionForm"
import ConferenceForm from "../pages/OrganizerDashboard/ConferenceForm"
import EventsSummary from "../pages/OrganizerDashboard/EventsSummary"
import SignupRoleSelector from "../pages/Signup/SignupRoleSelector"
import SignUpOrganizer from "../pages/Signup/SignupOrganizer"
import OrganizerProfile from "../pages/OrganizerProfile"




export const routes = [
  {path:'/',element:<HomePage/>},
  {path:'/find-events',element:<FilterEvents/>},
  {path:'/events/:id',element:<EventDetail/>},
  { path: '/login', element: <Login /> },
  // { path: '/signup/:role', element: <Signup /> }, 
  { path: '/organizer-welcome', element: <OrganizerWelcome /> },
  { path: '/create-event-form', element: <CreateEventForm /> },
  { path: '/events/:id', element: <EventPageCreation /> },
  { path: '/find-speaker-vendor', element: <EventSpeakersVendors /> },
  { path: '/help-centre', element: <HelpCentre /> },
  { path: '/signup-role-selector', element: <SignupRoleSelector /> },
  { path: '/signup/organizer', element: <SignUpOrganizer /> },
  { path: '/organizer-profile', element: <OrganizerProfile /> },
  {
  path: '/organizer-dashboard',
  element: <OrganizerDashboardSidebar />,
  children: [
    {
      index: true,
      element: <OrganizerDashboardHome />
    },
    {
      path: 'home',
      element: <OrganizerDashboardHome />
    },
    {
      path: 'create',
      element: <OrganizerCreateEventLanding />
    },
    {
      path: 'create/exhibition',
      element: <ExhibitionForm />
    },
    {
      path: 'create/conference',
      element: <ConferenceForm />
    },
     {
      path: 'events-summary',
      element: <EventsSummary />
    }
  ]
}


  
  
];