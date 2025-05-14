import Login from "../client/components/Login";

const LoginPage = () => {
  return (
    <div className="h-[85vh] flex flex-col">
      <div className="flex-grow">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
