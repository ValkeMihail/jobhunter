import googleLogo from '../../assets/googleLogo.png';
import './loginform.css';


type LoginFormProps = {
  onClick: () => void;
};

export const LoginForm = ({onClick} : LoginFormProps) => {
  return(
    
      <button
        onClick={onClick}
        className="googleLogo">
        <img 
          src={googleLogo} 
          alt="google sign in image button, google log in image button" />
      </button>
    
  );
}