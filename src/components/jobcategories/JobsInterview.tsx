import "./jobs.css";
import { JobCard, Job } from "../jobcard/JobCard";

type JobsProps = {
  jobsProp: Job[];
  onStatusChange: (id: number, status: string) => void;
};

export const JobsInterview = ({ jobsProp ,onStatusChange}: JobsProps) => {
  

  return (
    <div className="jobCont">
      <h1>Interviews</h1>
      <h2>
        {jobsProp.length}
      </h2>
      {jobsProp?.map((job) => (
        <JobCard 
          onStatusChange={onStatusChange}
          key={job.id} 
          job={job}  />
      ))}
    </div>
  );
};