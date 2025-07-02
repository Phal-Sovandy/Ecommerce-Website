import SignUpForm from "./SignUpForm.jsx";
import ModalInfo from "./ModalInfo";

const SignUp = ({ onClose }) => {
  return (
    <ModalInfo show={true} onClose={onClose} title="" head={false}>
      <SignUpForm />
    </ModalInfo>
  );
};

export default SignUp;
