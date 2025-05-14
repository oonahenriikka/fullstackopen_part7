import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import noteService from '../services/notes';
import commentService from '../services/comments';

const NoteView = () => {
  const [note, setNote] = useState(null);
  const [comments, setComments] = useState([]);  // Initialize as an empty array
  const [newComment, setNewComment] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noteData = await noteService.getNoteById(id);
        setNote(noteData);

        // Ensure comments is an array
        const commentsData = await commentService.getComments(id);
        if (Array.isArray(commentsData)) {
          setComments(commentsData);
        } else {
          setComments([]);  // Set to empty array if commentsData is not an array
        }
      } catch (error) {
        console.error('Error fetching note or comments:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const addedComment = await commentService.addComment(id, newComment);
      setComments((prevComments) => [...prevComments, addedComment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!note) {
    return null;  
  }

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>

      <h3>Comments</h3>
      <ul>
        {Array.isArray(comments) &&
          comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
      </ul>

      <h4>Add a comment:</h4>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Type your comment"
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default NoteView;
