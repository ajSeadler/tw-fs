// src/components/Home.tsx
import type { FC } from "react";
import Login from "./Login";

const Home: FC = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-zinc-950 h-full">
      <div className="mx-auto flex w-full flex-col justify-center px-5 md:max-w-[50%] lg:h-[100vh] min-h-[100vh] lg:max-w-[50%] lg:px-6">
        <Login />
      </div>
    </div>
  );
};

export default Home;
