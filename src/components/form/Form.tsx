import { FormEvent, useEffect, useState } from 'react';
import './Form.css';

export const Form = () => {
  const [jobsDailyCount, setJobsDailyCount] = useState(0);

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const storedDate = localStorage.getItem('date');
    if (storedDate && storedDate !== currentDate) {
      setJobsDailyCount(0);
    }
    localStorage.setItem('date', currentDate);

    const jobsAppliedToday = localStorage.getItem('jobsAppliedToday');
    if (jobsAppliedToday) {
      setJobsDailyCount(JSON.parse(jobsAppliedToday));
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJobsDailyCount(jobsDailyCount + 1);
    localStorage.setItem('jobsAppliedToday', JSON.stringify(jobsDailyCount + 1));
    event.currentTarget.reset();
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} className="formControl">
        <label htmlFor="company">Company</label>
        <input type="text" className="form-control" id="company" />
        <label htmlFor="title">Job Title</label>
        <input type="text" className="form-control" id="title" />
        <label htmlFor="location">Location</label>
        <input type="text" className="form-control" id="location" />
        <label htmlFor="url">Url</label>
        <input type="text" className="form-control" id="url" />
        <label htmlFor="notes">Notes</label>
        <textarea className="form-control" id="notes" rows={3}></textarea>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div className="heroSecton">
        <h1>Jobs Applied Today</h1>
        {
          jobsDailyCount <= 2 ? (
            <h1
              style={{
                color: 'orange',
                fontSize: '2rem',
              }}
              
            >
              {jobsDailyCount}
            </h1>
          ) : jobsDailyCount < 5 && jobsDailyCount > 2 ? (
            <h1
              style={{
                color: 'yellow',
                fontSize: '3rem',
              }}
            >
              {jobsDailyCount}
            </h1>
          ) :(
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
              <h2>
                Good Job! Keep it up!
              </h2>
            </>
          )
        }

      </div>
    </div>
  );
};
