import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    // Load bookmarked jobs from localStorage
    const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    setBookmarkedJobs(savedJobs);
  }, []);
  const removeBookmark = (jobId) => {
    // Remove the job from localStorage and update state
    const updatedJobs = bookmarkedJobs.filter((job) => job.id !== jobId);
    setBookmarkedJobs(updatedJobs);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
  };

  return (
    <div>
        <div>
      {bookmarkedJobs.length > 0 ? (
        bookmarkedJobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <p>Location: {job.primary_details != null ? job.primary_details.Place : ""}</p>
            <p>Salary: {job.primary_details != null ? job.primary_details.Salary : ""}</p>
            <p>Experience: {job.primary_details != null ? job.primary_details.Experience : ""}</p>
            <a href={job.custom_link}>Call HR: {job.whatsapp_no}</a>
            <div>
              {job.job_tags != null ? job.job_tags.map((tag) => (
                <span key={tag.value} style={{ backgroundColor: tag.bg_color, color: tag.text_color, padding: '5px', marginRight: '5px' }}>
                  {tag.value}
                </span>
              )) : ""}
            </div>
            <button onClick={() => removeBookmark(job.id)}>Remove Bookmark</button> {/* Remove button */}

          </div>
        ))
      ) : (
        <div>No bookmarked jobs available</div>
      )}
    </div>
    </div>
  );
};

export default Bookmarks;
