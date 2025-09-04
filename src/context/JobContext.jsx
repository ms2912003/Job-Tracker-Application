import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('jobApplications')) || [];
    setJobs(savedJobs);
  }, []); 
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(jobs));
  }, [jobs]); 

  const addJob = (newJob) => {
    setJobs(prevJobs => [...prevJobs, { ...newJob, id: uuidv4() }]);
  };

  const updateJob = (updatedJob) => {
    setJobs(prevJobs => prevJobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
  };

  const deleteJob = (id) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  const importJobs = (jsonString) => {
  try {
    const importedJobs = JSON.parse(jsonString);

    if (Array.isArray(importedJobs)) {
      const newJobsToAdd = [];
      const existingJobIds = new Set(jobs.map(job => job.id));

      importedJobs.forEach(job => {
        const jobId = job.id || uuidv4();
        if (!existingJobIds.has(jobId)) {
          newJobsToAdd.push({ ...job, id: jobId });
          existingJobIds.add(jobId); 
        }
      });
      
      if (newJobsToAdd.length > 0) {
        setJobs(prevJobs => [...prevJobs, ...newJobsToAdd]);
        alert(`✅ Imported ${newJobsToAdd.length} new jobs successfully!`);
      } else {
        alert("⚠️ No new jobs to import. All jobs in the file already exist.");
      }

      } else {
      throw new Error("Invalid JSON format. Expected an array.");
      }
    } catch (error) {
    alert(`❌ Error importing data: ${error.message}`);
    }
  };

  const exportJobs = () => {
    if (jobs.length === 0) {
      alert("⚠️ No jobs to export!");
      return;
    }

    const dataStr = JSON.stringify(jobs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'job_applications.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  return (
    <JobContext.Provider
      value={{ jobs, addJob, updateJob, deleteJob, importJobs, exportJobs }}
    >
      {children}
    </JobContext.Provider>
  );
};