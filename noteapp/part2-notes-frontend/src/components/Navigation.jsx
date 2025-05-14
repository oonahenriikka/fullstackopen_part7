import { Link } from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 10,
  }

  return (
    <div style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <Link to="/" style={padding}>notes</Link>
      <Link to="/users" style={padding}>users</Link>
      {user && (
        <span>
          {user.name} logged in
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>logout</button>
        </span>
      )}
    </div>
  )
}

export default Navigation;
