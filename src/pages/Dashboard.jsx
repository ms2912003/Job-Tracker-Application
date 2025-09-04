import { useContext, useState, useMemo } from 'react';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ["#2563eb", "#16a34a", "#eab308", "#dc2626"];

const Dashboard = () => {
  const { jobs, importJobs, exportJobs } = useContext(JobContext);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        importJobs(e.target.result);
        setFile(null);
      };
      reader.readAsText(file);
    }
  };

  const statusData = useMemo(() => {
    const counts = jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map((status) => ({
      name: status,
      value: counts[status],
    }));
  }, [jobs]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <h1 className="text-4xl font-extrabold tracking-tight">Job Applications</h1>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <Link
            to="/add"
            className="text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg"
          >
            Add Job
          </Link>
          <button
            onClick={exportJobs}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors duration-200 shadow-lg"
          >
            Export Data
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label
          htmlFor="import-file"
          className="cursor-pointer px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-full hover:bg-gray-400 transition-colors duration-200 shadow"
        >
          Choose JSON File
        </label>
        <input
          id="import-file"
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
        {file && (
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {file.name}
          </span>
        )}
        <button
          onClick={handleImport}
          disabled={!file}
          className="px-6 py-3 bg-yellow-600 text-white font-medium rounded-full disabled:opacity-50 hover:bg-yellow-700 transition-colors duration-200 shadow"
        >
          Import Data
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Application Status Overview</h2>
        {statusData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No job applications to display.</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg py-12">
            No job applications found. Start by adding one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
