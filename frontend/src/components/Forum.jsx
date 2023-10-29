import React, { useState } from 'react';
import Thread from './Thread';

const Forum = () => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState('');
  const [newComment, setNewComment] = useState('');

  const addThread = () => {
    const thread = {
      title: newThread,
      content: newComment,
      comments: [],
    };
    setThreads([...threads, thread]);
    setNewThread('');
    setNewComment('');
  };

  const addCommentToThread = (threadIndex, comment) => {
    const updatedThreads = [...threads];
    updatedThreads[threadIndex].comments.push(comment);
    setThreads(updatedThreads);
  };

  return (
    <div className="forum">
  
      <h1>Forum</h1>
      <div className="thread-form">
        <input
          type="text"
          placeholder="Thread Title"
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
        />
        <textarea
          placeholder="Thread Content"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addThread}>Add Thread</button>
      </div>

      <div className="threads">
        {threads.map((thread, index) => (
          <Thread
            key={index}
            thread={thread}
            onAddComment={(comment) => addCommentToThread(index, comment)}
          />
        ))}
      </div>
    </div>
  );
};

export default Forum;