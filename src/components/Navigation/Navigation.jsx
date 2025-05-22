import {Link} from "react-router-dom"
import "./Navigation.css"

// const showNavigation = location.pathname === "/";

const Navigation = ()=>{
  return (
    <nav>
      {/* {showNavigation && <Navigation />} */}
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/find-events">Find Events</Link></li>
            <li><Link to="/create-event">Create Event</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
        </ul>
    </nav>
  )
}
export default Navigation;