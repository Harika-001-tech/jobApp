import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const { jobId } = useParams(); // Get the job ID from the URL
  const { state } = useLocation(); // Get the job from state
  const jobq = !!state ? state.jobq : null;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs/${jobId}`); // Assuming there's an endpoint for fetching job details
        const jobFromResponse = response.data.results.find(x => x.id == jobId);
        setJob(jobFromResponse);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (jobq != null && jobq.id == jobId) {
      setJob(jobq);
      setLoading(false);
      setError(false);
    } else {
      fetchJobDetails();
    }
  }, [jobId, jobq]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>No job details available</div>;

  return (
    <div key={jobId} className="flex flex-col text-center m-0 text-xl p-3">
      <h1 className=' text-blue-500 text-2xl'>{job.title}</h1>
      <p>Location: {job.primary_details != null ? job.primary_details.Place : ""}</p>
      <p>Salary: {job.primary_details != null ? job.primary_details.Salary : ""}</p>
      <p>Experience: {job.primary_details != null ? job.primary_details.Experience : ""}</p>
      <p>Description: {job.description || 'No description available'}</p>
      <p>Requirements: {job.requirements || 'No requirements specified'}</p>
      <a href={job.custom_link}>Call HR: {job.whatsapp_no}</a>
      <div>
        {job.job_tags != null ? job.job_tags.map((tag, index) => (
          <span key={index} style={{ backgroundColor: tag.bg_color, color: tag.text_color, padding: '5px', marginRight: '5px' }}>
            {tag.value}
          </span>
        )) : ""}
      </div>
    </div>
  );
};

export default JobDetails;
