import { createContext, useEffect, useState } from "react";
import { Job } from "./components/jobcard/JobCard";
import { auth, signInWithPopup, GoogleAuthProvider, signOut ,db, doc, getDoc, setDoc, Timestamp } from "./firebase";



export type User = {
  id: string;
  jobs: Job[];
};


type AuthContextType = {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  handleSignOut: () => Promise<void>;
  handleJobAdd: (job: Job) => void;
  handleDeleteJob: (id: number) => void;
  handleStatusChangeUserUpdate: (id: number, status: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signInWithGoogle: () => Promise.resolve(),
  handleSignOut : () => Promise.resolve(), 
  handleJobAdd: () => {},
  handleDeleteJob: () => {},
  handleStatusChangeUserUpdate: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = doc(db, 'users', authUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const id = userDoc.id;
          const jobs = userDoc
            .data()
            .jobs.sort((a: { dateApplied: Timestamp }, b: { dateApplied: Timestamp }) =>
            b.dateApplied.toMillis() - a.dateApplied.toMillis()
          );
          const userData = {
            id,
            jobs,
          };
          setUser(userData);
        } else {
          const newUser = {
            id: authUser.uid,
            jobs: [],
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
    });
  }, [auth.currentUser]);
  


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const handleJobAdd = (job: Job) => {
    setUser((prevUser) => {
      if (prevUser) {
        const newUser = {
          ...prevUser,
          jobs: [job, ...prevUser.jobs],
        };
        return newUser;
      }
      return prevUser;
    });
  };
  

  const handleDeleteJob = (id: number) => {
    setUser((prevUser) => {
      if (prevUser) {
        const newUser = {
          ...prevUser,
          jobs: prevUser.jobs.filter((job) => job.id !== id),
        };
        return newUser;
      }
      return prevUser;
    });
  };

 const handleStatusChangeUserUpdate = (id: number, status: string) => {
    setUser((prevUser) => {
      if (prevUser) {
        const newUser = {
          ...prevUser,
          jobs: prevUser.jobs.map((job) => {
            if (job.id === id) {
              return { ...job, status: status };
            }
            return job;
          }),
        };
        return newUser;
      }
      return prevUser;
    });
  };



  return (
    <AuthContext.Provider value={{ user,handleDeleteJob,handleStatusChangeUserUpdate, handleJobAdd, signInWithGoogle, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );

};