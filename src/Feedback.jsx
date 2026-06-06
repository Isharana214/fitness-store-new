import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Feedback = ({ setActiveTab }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please write feedback first!');
      return;
    }

    try {
      setLoading(true);

      // Unique User ID (simple version)
      const userId = Date.now();

      const response = await emailjs.send(
        'service_ig6r413',
        'template_ctpm0fp',
        {
          user_id: userId,
          name: 'Fitness Dashboard User',
          message: text,
          time: new Date().toLocaleString(),
          email: 'isharana2810@gmail.com'
        },
        'L88xArgoCmCKbbrTZ'
      );

      console.log('SUCCESS:', response);

      alert('Thank you for your feedback!');
      setText('');

      if (setActiveTab) {
        setActiveTab('cultpass Home');
      }

    } catch (error) {
      console.log('ERROR:', error);
      alert(error?.text || error?.message || 'Email sending failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Give us your feedback</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your feedback here..."
        style={{
          width: '80%',
          height: '150px',
          padding: '10px',
          fontSize: '16px'
        }}
      />

      <br />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: loading ? '#999' : '#ff4500',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        {loading ? 'SENDING...' : 'SUBMIT FEEDBACK'}
      </button>
    </div>
  );
};

export default Feedback;