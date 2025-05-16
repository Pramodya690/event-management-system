import {Link} from "react-router-dom"
import "./Navigation.css"

const Navigation = ()=>{
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/find-events">Find Events</Link></li>
            <li><Link to="/create-event">Create Event</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    </nav>
  )
}
export default Navigation;