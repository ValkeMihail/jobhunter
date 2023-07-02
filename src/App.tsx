
import { useState } from 'react'
import './App.css'
import { Form } from './components/form/Form'
import { Job } from './components/jobcard/JobCard'
import { JobsContainer } from './containers/JobsContainer'



function App() {



  const jobs : Job[] = [
    {
      id: "1",
      jobTitle: "Software Engineer",
      companyName: "Google",
      dateApplied: new Date( "2023-06-01"),
      status: "applied",
      notes: "Applied online",
      url: "https://www.google.com",
      location: "Mountain View, CA"
    },
    {
      id: "2",
      jobTitle: "Software Engineer",
      companyName: "Facebook",
      dateApplied: new Date( "2023-03-01"),
      status: "interview",
      notes: "Applied online",
      url: "https://www.facebook.com",
      location: "Menlo Park, CA"
  
    },
    {
      id: "3",
      jobTitle: "Software Engineer",
      companyName: "Amazon",
      dateApplied: new Date( "2023-01-01"),
      status: "rejected",
      notes: "Applied online",
      url: "https://www.amazon.com",
      location: "Seattle, WA"
    }
  ]; 
  
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='appContainer'>
      <button 
        onClick={() => setShowForm(!showForm)}
        className='addNewJob'>
           Add Job 
      </button>
      {
        showForm ? <Form/> : null
      }
        

      <div className='jobsContainer'>
      <JobsContainer
        jobsProp={jobs}
      />
      </div>
    </div>
  )
}

export default App
