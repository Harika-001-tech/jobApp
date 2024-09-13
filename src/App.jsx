import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import JobDetails from './components/JobDetails';
import { Link } from 'react-router-dom';

const App = () => {
  const [currentTab, setCurrentTab] = useState('jobs');

  const handleBookmark = (job) => {
    const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    if (!savedJobs.some((savedJob) => savedJob.id === job.id)) {
      savedJobs.push(job);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(savedJobs));
    }
  };

  return (
    <Router>
      <nav>
        
        <div className='flex flex-row text-center justify-evenly p-2 '>
        <Link to="/"  className=' text-3xl text-blue-700 font-semibold'><button className="p-0 text-3xl"onClick={() => setCurrentTab('jobs')}>Jobs</button></Link>
        <Link to="/bookmarks" className=' text-3xl text-green-700 font-semibold'> <button className="p-0 text-3xl" onClick={() => setCurrentTab('bookmarks')}></button>Bookmarks</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Jobs onBookmark={handleBookmark} />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
