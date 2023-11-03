import { useState } from 'react';

export const ThoughtForm = ({ apiUrl, onThoughtAdded }) => {
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (message.length < 5) {
      setValidationError('Your message is too short, it needs at least 5 letters 😔');
    } else if (message.length > 140) {
      setValidationError('Your message is too long 😔');
    } else {
      setValidationError('');

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
        .then((response) => response.json())
        .then((newThought) => {
          onThoughtAdded();
          setMessage('');
        })
        .catch((error) => console.error('Error posting thought:', error));
    }
  };

  const handleTextAreaChange = () => {
    setValidationError('');
  };

  return (
    <div className='thought-form'>
      <div className='form-question'>
        <h3>What is making you happy right now?</h3>
      </div>
    <form className = "form" onSubmit={handleFormSubmit}>
      <textarea
        value={message}
        rows="3"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="'If music be the food of love, play on.' - William Shakespeare"
        onInput={handleTextAreaChange}
      />
      {validationError && <p className="error">{validationError}</p>}
      <div className='message-length'>
        <span>{0 + message.length}</span>/140
      </div>
      <button className='btn' type="submit">❤️ Send Happy Thought ❤️</button>
    </form>
    </div>
  );
}

export default ThoughtForm;
