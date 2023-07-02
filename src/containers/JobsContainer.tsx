import { Job } from "../components/jobcard/JobCard";
import { JobsApplied } from "../components/jobcategories/JobsApplied";
import { JobsInterview } from "../components/jobcategories/JobsInterview";
import { JobsRejected } from "../components/jobcategories/JobsRejected";
import {useState, useEffect} from "react";


type JobsProps = {
  jobsProp: Job[];
};


export const JobsContainer = ({jobsProp} : JobsProps) => {

  const [jobs, setJobs] = useState<Job[]>(jobsProp);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [interviewJobs, setInterviewJobs] = useState<Job[]>([]);
  const [rejectedJobs, setRejectedJobs] = useState<Job[]>([]);


  useEffect(() => {

    const appliedJobs = jobs.filter((job) => job.status === "applied");
    setAppliedJobs(appliedJobs);
    const interviewJobs = jobs.filter((job) => job.status === "interview");
    setInterviewJobs(interviewJobs);
    const rejectedJobs = jobs.filter((job) => job.status === "rejected");
    setRejectedJobs(rejectedJobs);

  }, [jobs]);

  const handleStatusChange = (id: string, status: string) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === id) {
        return { ...job, status: status };
      }
      return job;
    });
    setJobs(updatedJobs);
  };


  return (
    <>
      <JobsApplied 
        jobsProp={appliedJobs}
        onStatusChange={handleStatusChange}   
      />
      <JobsInterview
        jobsProp={interviewJobs}
        onStatusChange={handleStatusChange}
      />
      <JobsRejected
      jobsProp={rejectedJobs}
      onStatusChange={handleStatusChange}
      />        
    </>
  );
}