import Login from "../client/components/Login";

const LoginPage = () => {
  return (
    <div className="bg-black h-screen flex flex-col">
      <div className="flex-grow">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
