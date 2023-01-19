import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth'

function Welcome() {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-UK', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const {username, isManager, isAdmin} = useAuth()

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}🎉!</h1>

      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">Add New techNotes</Link>
      </p>
      {(isAdmin || isManager) && <p>
        <Link to="/dash/users">View User Settings</Link>
      </p>}
      {(isAdmin || isManager) && <p>
        <Link to="/dash/users/new">Add new user</Link>
      </p>}
    </section>
  );
  return content;
}

export default Welcome;
