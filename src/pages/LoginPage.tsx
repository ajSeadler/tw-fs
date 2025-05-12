import Login from "../client/components/Login";

const LoginPage = () => {
  return (
    <div className="bg-black h-[85vh] flex flex-col">
      <div className="flex-grow bg-black">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
