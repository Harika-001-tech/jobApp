import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const jobsPerPage = 10;

  const [bookmarkedJobs, setBookmarkedJobs] = useState(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedJobs');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });



  useEffect(() => {

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://testapi.getlokalapp.com/common/jobs', {
          params: { page, limit: jobsPerPage },
        });
        setJobs(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  // Function to bookmark/unbookmark a job
  const toggleBookmark = (job) => {
    let updatedBookmarks;
    if (bookmarkedJobs.some((b) => b.id === job.id)) {
      updatedBookmarks = bookmarkedJobs.filter((b) => b.id !== job.id);
    } else {
      updatedBookmarks = [...bookmarkedJobs, job];
    }
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks)); // Save to localStorage
  };

  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <div>
      {currentJobs.length > 0 ? (
        currentJobs.map((job, index) => (
          <div key={index} className='flex flex-col space-x-1 m-1 p-2 text-center justify-center'>
            <div className="job-card">
              <Link to={`/jobs/${job.id}`} state={{jobq: job}}>
                <h2 className='text-2xl text-blue-600'>{job.title}</h2>
              </Link>

              <p className='font-medium'>Location: {job.primary_details?.Place || ''}</p>
              <p className='font-medium'>Salary: {job.primary_details?.Salary || ''}</p>
              <p className='font-medium'>Experience: {job.primary_details?.Experience || ''}</p>
              <div className='flex flex-row space-x-1 m-1 py-6 text-center justify-center p-3'>
                <a className='font-medium' href={job.custom_link}>Call HR: {job.whatsapp_no}</a>
                {/* Bookmark Button */}
                <button className=" bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={() => toggleBookmark(job)}>
                  {bookmarkedJobs.some((b) => b.id === job.id) ? 'Unbookmark' : 'Bookmark'}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No jobs available</div>
      )}
      <div className="pagination">
        <button className=" bg-blue-400 hover:bg-grey-500 text-white font-bold py-2 px-4 rounded" onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button className=" bg-blue-400 hover:bg-grey-500 text-white font-bold py-2 px-4 rounded" onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;
