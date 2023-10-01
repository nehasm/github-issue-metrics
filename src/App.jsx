import React, { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import InputRepo from './components/InputRepo';
import MetricMain from './components/MetricMain';
import List from './components/List';

function App() {
  const [count, setCount] = useState(0);

  return (
    <HashRouter>
      <Routes>
        <Route path="/metrics/:owner/:repoName" element={<MetricMain />} />
        <Route path="/issues/:owner/:repoName" element={<List />} />
        <Route path="/" element={<InputRepo />} />
      </Routes>
    </HashRouter>
  );
}

export default App;