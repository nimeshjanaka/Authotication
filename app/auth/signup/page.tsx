import SignUpForm from "@/app/components/SignUpForm";
import { Image, Link } from "@nextui-org/react";

const SignupPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 place-items-center items-center mt-10">
      <SignUpForm />
    </div>
  );
};

export default SignupPage;
