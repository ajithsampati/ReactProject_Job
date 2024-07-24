import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const[titleName, setTitleName] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(data => {
        setData(data.data.children);
        setTitleName(`ReactJS Sub reddit - ${data.data.children.length} posts`);
      })
      .catch(error => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1 className='titleName'>{titleName}</h1>
      <div className='card-content text-justify'>
      <div className="card-container ">
        {data.map((post, index) => (
          <div key={index} className="card">
            <h2 className="cardtitle">{post.data.title}</h2>
            <div className="self-text" dangerouslySetInnerHTML={{ __html: post.data.selftext_html }} />
            <a href={post.data.url} target="_blank" rel="noopener noreferrer" className="url">
              {post.data.url}
            </a>
            <p className="score">Score: {post.data.score}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;