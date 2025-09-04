import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <Link to={`/job/${job.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <h3 className="text-lg font-bold mb-1 truncate">{job.jobTitle}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 truncate">{job.companyName}</p>
        <div className="flex justify-between items-center text-sm">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            job.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
            job.status === 'Interviewing' ? 'bg-yellow-100 text-yellow-800' :
            job.status === 'Offer' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>{job.status}</span>
          <p className="text-gray-500 dark:text-gray-400">Applied: {job.applicationDate}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
