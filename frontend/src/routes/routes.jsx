import HomePage from "../pages/Homepage/HomePage";
import FilterEvents from "../pages/FilterEvents";
import EventPage from "../pages/EventPage";
import Login from "../pages/Login";
import OrganizerWelcome from "../pages/OrganizerWelcome";
import CreateEventForm from "../pages/CreateEventForm/CreateEventForm";
import HelpCentre from "../pages/HelpCentre";
import OrganizerDashboardHome from "../pages/OrganizerDashboard/OrganizerDashboardHome";
import OrganizerDashboardSidebar from "../pages/OrganizerDashboard/OrganizerDashboardSidebar";
import OrganizerCreateEventLanding from "../pages/OrganizerDashboard/OrganizerCreateEventLanding";
import ConferenceForm from "../pages/OrganizerDashboard/BuildEventPage/EventForm";
import EventsSummary from "../pages/OrganizerDashboard/EventsSummary";
import SignupRoleSelector from "../pages/Signup/SignupRoleSelector";
import SignUpOrganizer from "../pages/Signup/SignupOrganizer";
import OrganizerProfile from "../pages/OrganizerProfile";
import OrganizerDashboardFindVendors from "../pages/OrganizerDashboard/OrganizerDashboardFindVendors";
import SignupVendor from "../pages/Signup/SignupVendor";
import VendorProfile from "../pages/VendorProfile";
import SignupAttendee from "../pages/Signup/SignupAttendee";
import EventAnalytics from "../pages/OrganizerDashboard/EventAnalytics";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Marketing from "../pages/OrganizerDashboard/Marketing";
import PaymentPage from "../pages/PaymentPage";
import TicketsBought from "../pages/TicketsBought";
import VendorHomePage from "../pages/VendorHomePage";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/find-events", element: <FilterEvents /> },
  { path: "/events/:id", element: <EventPage /> },
  { path: "/login", element: <Login /> },
  { path: "/organizer-welcome", element: <OrganizerWelcome /> },
  { path: "/create-event-form", element: <CreateEventForm /> },
  { path: "/help-centre", element: <HelpCentre /> },
  { path: "/signup-role-selector", element: <SignupRoleSelector /> },
  { path: "/signup/organizer", element: <SignUpOrganizer /> },
  // { path: "/organizer-profile", element: <OrganizerProfile /> },
  { path: "/signup/vendor", element: <SignupVendor /> },
  { path: "/vendor-profile", element: <VendorProfile /> },
  { path: "/signup/attendee", element: <SignupAttendee /> },
  { path: "/admin-dashboard", element: <AdminDashboard /> },
  { path: "/payment", element: <PaymentPage />},
   { path: "/tickets-bought", element: <TicketsBought /> },
  { path: "/vendor-home-page", element: <VendorHomePage /> },
  { path: "/organizer/:id",  element: <OrganizerProfile /> },

  {
    path: "/organizer-dashboard",
    element: <OrganizerDashboardSidebar />,
    children: [
      {
        index: true,
        element: <OrganizerDashboardHome />,
      },
      {
        path: "home",
        element: <OrganizerDashboardHome />,
      },
      {
        path: "create",
        element: <OrganizerCreateEventLanding />,
      },
      {
        path: "create/conference",
        element: <ConferenceForm />,
      },
      {
        path: "events-summary",
        element: <EventsSummary />,
      },
      {
        path: "find-vendors",
        element: <OrganizerDashboardFindVendors />,
      },
      {
        path: "event-analytics",
        element: <EventAnalytics />,
      },
      {
        path: "marketing",
        element: <Marketing />,
      }
    ],
  },
];
