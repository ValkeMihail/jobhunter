import { FormEvent, useContext, useEffect, useState } from 'react';
import './Form.css';
import { Timestamp, arrayUnion, collection, db, updateDoc } from '../../firebase';
import { AuthContext } from '../../AuthContext';
import { doc } from 'firebase/firestore';
import { Job } from '../jobcard/JobCard';
import { hashString, showMessage } from '../../helpers';

export const Form = () => {
  const { user, handleJobAdd } = useContext(AuthContext);
  const [jobsDailyCount, setJobsDailyCount] = useState(0);

  const JobDefault: Job = {
    id: 0,
    companyName: '',
    jobTitle: '',
    dateApplied: Timestamp.now(),
    status: 'applied',
    url: '',
    location: '',
    notes: '',
  };

  const [newJobData, setNewJobData] = useState<Job>(JobDefault);

  useEffect(() => {
    const jobsAppliedToday = localStorage.getItem('jobsAppliedToday');
    const lastDayApplied = localStorage.getItem('lastDayApplied');
    const currentDate = new Date();
    const lastDay = lastDayApplied ? new Date(lastDayApplied) : null;
  
    if (
      jobsAppliedToday &&
      lastDay &&
      currentDate.getDate() !== lastDay.getDate()
    ) {
      setJobsDailyCount(0);
      localStorage.setItem('jobsAppliedToday', '0');
      localStorage.setItem('lastDayApplied', currentDate.toISOString());
    } else if (!jobsAppliedToday) {
      setJobsDailyCount(0);
      localStorage.setItem('jobsAppliedToday', '0');
      localStorage.setItem('lastDayApplied', currentDate.toISOString());
    } else {
      setJobsDailyCount(Number(jobsAppliedToday));
    }
  }, []);
  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usersColRef = collection(db, 'users');
    const userRef = doc(usersColRef, user?.id);

    const jobWithUniqueId: Job = {
      ...newJobData,
      id: hashString(Timestamp.now().toString()),
    };

    handleJobAdd(jobWithUniqueId);
    await updateDoc(userRef, {
      jobs: arrayUnion(jobWithUniqueId),
    });

    setJobsDailyCount((prevCount) => prevCount + 1);
    localStorage.setItem('jobsAppliedToday', String(jobsDailyCount + 1));

    setNewJobData(JobDefault);

    showMessage('Job Added Successfully', "green");
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="formControl">
        <label htmlFor="company">Company</label>
        <input
          onChange={(event) => {
            setNewJobData({ ...newJobData, companyName: event.target.value });
          }}
          type="text"
          className="form-control"
          id="company"
          value={newJobData.companyName!}
        />
        <label htmlFor="title">Job Title</label>
        <input
          onChange={(event) => {
            setNewJobData({ ...newJobData, jobTitle: event.target.value });
          }}
          type="text"
          className="form-control"
          id="title"
          value={newJobData.jobTitle!}
        />
        <label htmlFor="location">Location</label>
        <input
          onChange={(event) => {
            setNewJobData({ ...newJobData, location: event.target.value });
          }}
          type="text"
          className="form-control"
          id="location"
          value={newJobData.location!}
        />
        <label htmlFor="url">Url</label>
        <input
          onChange={(event) => {
            setNewJobData({ ...newJobData, url: event.target.value });
          }}
          type="text"
          className="form-control"
          id="url"
          value={newJobData.url!}
        />
        <label htmlFor="notes">Notes</label>
        <textarea
          onChange={(event) => {
            setNewJobData({ ...newJobData, notes: event.target.value });
          }}
          className="form-control"
          id="notes"
          rows={3}
          value={newJobData?.notes!}
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="heroSecton">
        <h1>Jobs Added Today</h1>
        {jobsDailyCount <= 2 ? (
          <h1
            style={{
              color: 'orange',
              fontSize: '2rem',
            }}
          >
            {jobsDailyCount}
          </h1>
        ) : jobsDailyCount < 5 ? (
          <h1
            style={{
              color: 'yellow',
              fontSize: '3rem',
            }}
          >
            {jobsDailyCount}
          </h1>
        ) : (
          <>
            <h1
              style={{
                color: 'green',
                fontSize: '5rem',
              }}
            >
              {jobsDailyCount}
            </h1>
            <br />
            <h2>Good Job! Keep it up!</h2>
          </>
        )}
      </div>
    </div>
  );
};
