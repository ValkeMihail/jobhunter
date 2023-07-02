import "./jobs.css";
import { JobCard, Job } from "../jobcard/JobCard";

type JobsProps = {
  jobsProp: Job[];
  onStatusChange: (id: string, status: string) => void;
};

export const JobsApplied = ({ jobsProp,onStatusChange }: JobsProps) => {
  

  return (
    <div className="applied">
      <h1>Applied</h1>
      {jobsProp?.map((job) => (
        <JobCard 
          key={job.id} 
          onStatusChange={onStatusChange}
          job={job}  />
      ))}
    </div>
  );
};