import { useState } from 'react';

const formatTimeDifference = (timestamp) => {
    const now = new Date();
    const thoughtTime = new Date(timestamp);
    const timeDifference = now - thoughtTime;
  
    if (timeDifference < 60000) {
      return 'less than a minute ago';
    } else if (timeDifference < 3600000) {
      const minutesAgo = Math.floor(timeDifference / 60000);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    } else if (timeDifference < 86400000) {
      const hoursAgo = Math.floor(timeDifference / 3600000);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else {
      const daysAgo = Math.floor(timeDifference / 86400000);
      return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
    }
  };

const ThoughtList = ({ thoughts, onLikeThought }) => {
    const [clickedThoughts, setClickedThoughts] = useState([]);
    const handleLikeClick = (thoughtId) => {
        setClickedThoughts([...clickedThoughts, thoughtId]);
        fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thoughtId}/like`, {
        method: 'POST',
    })
      .then((response) => response.json())
      .then((likedThought) => {
        onLikeThought(likedThought);
      })
      .catch((error) => console.error('Error liking thought:', error));
  };

  return (
    <div className='thought-list'>
      {thoughts.map((thought) => (
        <div key={thought._id} className="thought">
          <p className='message'>{thought.message}</p>
          <div className='post-info'>
          <div>
          <button
                className={`like-btn ${clickedThoughts.includes(thought._id) ? 'clicked' : ''}`}
                onClick={() => handleLikeClick(thought._id)}
              >
                <span className='heart-emoji'>❤️</span>
            </button>
            <span className='likes'>x{thought.hearts}</span>
          </div>
          <p className='time'>{formatTimeDifference(thought.createdAt)}</p>
        </div>
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;
