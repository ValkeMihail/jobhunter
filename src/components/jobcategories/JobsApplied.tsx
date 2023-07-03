import "./jobs.css";
import { JobCard, Job } from "../jobcard/JobCard";

type JobsProps = {
  jobsProp: Job[];
  onStatusChange: (id: number, status: string) => void;
};

export const JobsApplied = ({ jobsProp,onStatusChange }: JobsProps) => {
  

  

  return (
    <div className="jobCont">
      <h1>Applied</h1>
      <h2>{jobsProp.length}</h2>
      {jobsProp?.map((job) => (
        <JobCard 
          key={job.id} 
          onStatusChange={onStatusChange}
          job={job}  />
      ))}
    </div>
  );
};