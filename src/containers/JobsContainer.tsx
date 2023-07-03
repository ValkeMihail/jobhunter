import { doc, updateDoc } from "@firebase/firestore";
import { Job } from "../components/jobcard/JobCard";
import { JobsApplied } from "../components/jobcategories/JobsApplied";
import { JobsInterview } from "../components/jobcategories/JobsInterview";
import { JobsRejected } from "../components/jobcategories/JobsRejected";
import {useState, useEffect, useContext} from "react";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase";


type JobsProps = {
  jobsProp: Job[];
};


export const JobsContainer = ({jobsProp} : JobsProps) => {

  const {user,handleStatusChangeUserUpdate} = useContext(AuthContext);
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

  const handleStatusChange = (id: number, status: string) => {
    handleStatusChangeUserUpdate(id, status);
    const updatedJobs = jobs.map((job) => {
      if (job.id === id) {
        const userJobs = user?.jobs?.filter((job) => job.id !== id);
        const updatedJob = { ...job, status: status };
        const updatedJobs = [...userJobs!, updatedJob];
        const userRef = doc(db, 'users', user?.id!);
  
        updateDoc(userRef, {
          jobs: updatedJobs,
        });
  
        return updatedJob;
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