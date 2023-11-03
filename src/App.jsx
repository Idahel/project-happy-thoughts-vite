import React, { useState, useEffect } from 'react';

import Header from './assets/Components/Header.jsx'
import ThoughtList from './assets/Components/ThoughtList.jsx';
import ThoughtForm from './assets/Components/ThoughtForm.jsx';

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const apiUrl = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';

  useEffect(() => {
    fetchThoughts();
  }, []);

  const fetchThoughts = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setThoughts(data))
      .catch((error) => console.error('Error fetching thoughts:', error));
  };

  const handleLikeThought = (likedThought) => {
    const updatedThoughts = thoughts.map((thought) => {
      if (thought._id === likedThought._id) {
        return likedThought;
      } else {
        return thought;
      }
    });

    setThoughts(updatedThoughts);
  };

  return (
    <div className="App">
      <Header />
      <ThoughtForm apiUrl={apiUrl} onThoughtAdded={fetchThoughts} />
      <ThoughtList thoughts={thoughts} onLikeThought={handleLikeThought} />
    </div>
  );
}

export default App;
