import { useContext } from 'react';
import { JobContext } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';
import JobForm from '../components/JobForm';

const AddJob = () => {
  const { addJob } = useContext(JobContext);
  const navigate = useNavigate();

  const handleSave = (jobData) => {
    addJob(jobData);
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Job Application</h1>
      <JobForm onSave={handleSave} />
    </div>
  );
};

export default AddJob;