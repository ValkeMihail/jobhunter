import "./jobcard.css";
import companypng from "../../assets/company.png";
import { getTimeAgo } from "../../helpers";
import chevronDown from "../../assets/chevronDown.svg";
import { useState , useEffect} from "react";
import arrowRight from "../../assets/arrowRight.png";
import arrowLeft from "../../assets/arrowLeft.png"; 

export type Job = {
  id: string;
  jobTitle: string;
  companyName: string;
  dateApplied: Date;
  location: string;
  status: string;
  notes: string;
  url: string;
};

type JobCardProps = {
  job: Job;
  onStatusChange: (id: string, status: string) => void;
};

const statusArray = ["applied", "interview", "rejected"];

export const JobCard = ({ job ,onStatusChange}: JobCardProps) => {

  const [status, setStatus] = useState(job.status);
  const [showNotes, setShowNotes] = useState(false);

  
  useEffect(() => {
    onStatusChange(job.id, status);
  }, [status]);



  
  
  const moveJob = (direction: string) => {
    const currentIndex = statusArray.indexOf(status);
    if (direction === "left" && currentIndex > 0) {
      setStatus(statusArray[currentIndex - 1]);
    } else if (direction === "right" && currentIndex < statusArray.length - 1) {
      setStatus(statusArray[currentIndex + 1]);
    }
  };



  return (
    <div
      className={`jobCard ${job.status}Card`}
    >
      <div className="topArrows">
        <img 
          onClick={() => moveJob("left")}
          src={arrowLeft} 
          alt="arrow move job to left status" />
        <img 
          onClick={() => moveJob("right")}
          src={arrowRight} 
          alt="arrow move job to right status" />
      </div>
      <h2>{job.jobTitle}</h2>
      <div className="companyWrap">
        <img className="companyLogo" src={companypng} alt="company logo" />
        <h3>{job.companyName}</h3>
      </div>
      <div className="dateAndLocationWrap">
        <h4>{getTimeAgo(job.dateApplied)}</h4>
        <h4>{job.location}</h4>
      </div>
      <div className="accordionNotes">
        <div onClick={() => setShowNotes(!showNotes)} className="accordionHeader">
          <h4>Notes</h4>
          <img className="chevronDown" src={chevronDown} alt="drop down button" />
        </div>
        {showNotes ? (
          <div className="accordionNotesContent">
            <a href={job.url}>{job.url}</a>
            <br />
            {job.notes}
          </div>
        ) : null}
      </div>
    </div>
  );
};
