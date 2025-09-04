import { useContext, useState } from 'react';
import { JobContext } from '../context/JobContext';
import { useParams, useNavigate } from 'react-router-dom';
import JobForm from '../components/JobForm';

const JobDetails = () => {
  const { jobs, updateJob, deleteJob } = useContext(JobContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const job = jobs.find(job => job.id === id);

  if (!job) {
    return <div className="text-center text-xl mt-12 text-red-500">Job not found.</div>;
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      deleteJob(id);
      navigate('/');
    }
  };

  const handleSaveEdit = (updatedData) => {
    updateJob({ ...job, ...updatedData });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {isEditing ? (
        <JobForm job={job} onSave={handleSaveEdit} onCancel={() => setIsEditing(false)} />
      ) : (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">{job.jobTitle}</h1>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">{job.companyName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <p className="flex items-center space-x-2"><span className="font-medium">Status:</span> <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              job.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
              job.status === 'Interviewing' ? 'bg-yellow-100 text-yellow-800' :
              job.status === 'Offer' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>{job.status}</span></p>
            <p className="flex items-center space-x-2"><span className="font-medium">Applied Date:</span> <span className="text-gray-600 dark:text-gray-400">{job.applicationDate}</span></p>
            <p className="col-span-full"><span className="font-medium block mb-2">Notes:</span> <span className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg block text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{job.notes || 'No notes available.'}</span></p>
          </div>
          <div className="mt-8 flex space-x-4 justify-end">
            <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-200">Edit</button>
            <button onClick={handleDelete} className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors duration-200">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
