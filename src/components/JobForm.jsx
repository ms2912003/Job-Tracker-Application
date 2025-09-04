import { useState } from 'react';

const JobForm = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: job?.companyName || '',
    jobTitle: job?.jobTitle || '',
    status: job?.status || 'Applied',
    applicationDate: job?.applicationDate || new Date().toISOString().slice(0, 10),
    notes: job?.notes || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-2xl mx-auto space-y-5">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2"
        />
      </div>
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2"
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div>
        <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Application Date</label>
        <input
          type="date"
          id="applicationDate"
          name="applicationDate"
          value={formData.applicationDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
        <textarea
          id="notes"
          name="notes"
          rows="4"
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200">
            Cancel
          </button>
        )}
        <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-200">
          Save
        </button>
      </div>
    </form>
  );
};

export default JobForm;
