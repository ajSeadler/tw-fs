import type { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./client/components/Home"; // Import Home component
import Navbar from "./client/components/Navbar";
import SignUp from "./client/components/SignUp";
import { Profile } from "./client/components/Profile";
import LoginPage from "./pages/LoginPage";
import FinishAccount from "./client/components/FinishAccount";
import EventsWithResults from "./client/components/EventsWithResults";
import EventDetail from "./client/components/EventDetail"; // Import the EventDetail component
import Footer from "./client/components/Footer";
import TermsAndConditions from "./client/components/TermsAndConditions";
import ContactSection from "./client/components/ContactSection";
import GeneralSupport from "./client/components/GeneralSupport";
import ReportBug from "./client/components/ReportBug";

const App: FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/finishaccount" element={<FinishAccount />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/events" element={<EventsWithResults />} />

        {/* Add the route for EventDetail with dynamic eventId */}
        <Route path="/event/:id" element={<EventDetail />} />

        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/support&feedback" element={<ContactSection />} />
        <Route path="/support" element={<GeneralSupport />} />
        <Route path="/bug-report" element={<ReportBug />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
