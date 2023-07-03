import "./jobcard.css";
import companypng from "../../assets/company.png";
import { getTimeAgo } from "../../helpers";
import chevronDown from "../../assets/chevronDown.svg";
import { useState ,useContext, useEffect} from "react";
import arrowRight from "../../assets/arrowRight.png";
import arrowLeft from "../../assets/arrowLeft.png"; 
import locationIcon from "../../assets/location.svg";
import timeIcon from "../../assets/time.svg";
import { Timestamp, arrayRemove, collection, db, doc, updateDoc } from "../../firebase";
import { AuthContext } from "../../AuthContext";

export type Job = {
  id: number | null;
  jobTitle: string | null;
  companyName: string | null;
  dateApplied: Timestamp;
  location: string | null;
  status: string | null;
  notes: string | null;
  url: string | null;
};

type JobCardProps = {
  job: Job;
  onStatusChange: (id: number, status: string) => void;
};

const statusArray = ["applied", "interview", "rejected"];

export const JobCard = ({ job ,onStatusChange}: JobCardProps) => {

  const [status, setStatus] = useState(job.status);
  const [showNotes, setShowNotes] = useState(false);

  const {user,handleDeleteJob} = useContext(AuthContext);

  useEffect(() => {
    if (job.id != null && status != null)
    onStatusChange(job.id, status);
  }, [status]);



  const handleDelete = async(id: number) => {
    const userRef = doc (collection(db, "users"), user!?.id!); 
    const currentJobs = user?.jobs;
    const jobObj = currentJobs?.find((job) => job.id === id);
    await updateDoc(userRef, {
      jobs: arrayRemove(jobObj),
    }).then(()=> {
      handleDeleteJob(id);
      console.log("object deleted");
    })
  }

  
  
  const moveJob = (direction: string) => {
    const currentIndex = statusArray.indexOf(status!);
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
        <div className="flexRow timeWrap">
          <img src={timeIcon} alt=" time icon" />
          <h4>{getTimeAgo(job.dateApplied)}</h4>
        </div>
        <div className="flexRow">
           <img src={locationIcon} alt=" location icon" />
          <h4>{job.location}</h4>
        </div>
      </div>
      <div className="accordionNotes">
        <div onClick={() => setShowNotes(!showNotes)} className="accordionHeader">
          <h4>Info</h4>
          <img className="chevronDown" src={chevronDown} alt="drop down button" />
        </div>
        {showNotes ? (
          <div className="accordionNotesContent">
            <a href={job.url!} target="blank">{job.url!}</a>
            <br />
            {job.notes}
            <br />
            <button
              style={{
                border: "none",
                backgroundColor: "orangered",
                marginTop: "1rem",
              }}
              onClick={() => handleDelete(job.id!)}  
            >
              Delete Job
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
