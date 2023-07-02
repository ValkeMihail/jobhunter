import "./jobs.css";
import { JobCard, Job } from "../jobcard/JobCard";

type JobsProps = {
  jobsProp: Job[];
  onStatusChange: (id: string, status: string) => void;
};

export const JobsInterview = ({ jobsProp ,onStatusChange}: JobsProps) => {
  

  return (
    <div className="applied">
      <h1>Interviews</h1>
      {jobsProp?.map((job) => (
        <JobCard 
          onStatusChange={onStatusChange}
          key={job.id} 
          job={job}  />
      ))}
    </div>
  );
};