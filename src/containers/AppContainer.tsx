import { useContext, useEffect, useState } from 'react'
import { Job } from '../components/jobcard/JobCard'
import { JobsContainer } from './JobsContainer';
import { Form } from '../components/form/Form';
import { LoginForm } from '../components/loginform/Login';
import { AuthContext } from '../AuthContext';
import logo from '../assets/logo.png';
export const AppContainer = () => {

  const { user, signInWithGoogle , handleSignOut} = useContext(AuthContext);

  const [jobs, setJobs] = useState<null | Job[]>(null);

  
  useEffect(() => {
    const getJobs = async () => {
      if (user == null && jobs == null) return;
      const currentJobs = user?.jobs;
      if (currentJobs) {
        setJobs(currentJobs);
      }
    }
    getJobs();
  },[user]);


  const [showForm, setShowForm] = useState(false);

  
  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  }

  const handleSignOutUser = async () => {
    await handleSignOut();
  }


  return (
    <div className='appContainer'>
      {
        user ? (
          <>
            <div className='headerApp'>
              <div className='logoWrap'>
                <img 
                  className='logoImage'
                  src={logo} alt="logo image" />
                <h1>Welcome to ScoutCareer</h1>
              </div>

              <button 
                className='signOut'
                onClick={handleSignOutUser}
              >
                Sign Out
              </button>
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className='addNewJob'>
                Add Job 
            </button>
            {
              showForm ? <Form/> : null
            }
            {
              user && jobs?.length == user?.jobs.length ? (
                
                <div className='jobsContainer'>
                <JobsContainer
                  jobsProp={jobs}
                />
                </div>
              ): (
                null
              )
            }
          </>
        ) :(
          <LoginForm
          onClick={handleSignInWithGoogle}
          />
        )
      }
    </div>
  )
}