// App.tsx
import type { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./client/components/Home"; // Import Home component
import Navbar from "./client/components/Navbar";
import SignUp from "./client/components/SignUp";
import { Profile } from "./client/components/Profile";
import LoginPage from "./pages/LoginPage";
import FinishAccount from "./client/components/FinishAccount";
import EventsWithResults from "./client/components/EventsWithResults";

const App: FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set the home route */}
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* Set the home route */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/finishaccount" element={<FinishAccount />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/events" element={<EventsWithResults />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
