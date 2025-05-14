import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/users';

const User = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    userService
      .getUserById(id)
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [id]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Notes added by {user.name}</h3>
      <ul>
        {user.notes.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
