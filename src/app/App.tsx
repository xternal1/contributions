import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import GuestLayout from './route/GuestLayout';
import LandingPage from "../pages/guest/dashboard/Dashboard";
import Course from "../pages/guest/Course/CoursePage";
import Event from '../pages/guest/event/Event';
import KelasIndustri from '../pages/guest/kelasindustri/KelasIndustri';
import FaqPage from "../pages/guest/faq/FaqPage";
import FaqDetailPage from "../pages/guest/faq/FaqDetailPage";
import FaqCategoryDetailPage from "../pages/guest/faq/FaqCategoryDetailPage";
import Spinner from "../components/public/Spinner";
import CourseDetail from '../pages/guest/Course/CourseDetail'
import EventDetails from "../pages/guest/event/EventDetails";
import Login from "../pages/guest/auth/login";
import Register from "../pages/guest/auth/register";
import AuthLayout from "./route/AuthLayout";
import ForgotPassword from "../pages/guest/auth/forgotpassword";
import UpdatePassword from '../pages/guest/auth/updatepassword';
import TransactionPage from "../pages/user/transaction/Transaction";
import TransactionDetailPage from "../pages/user/transaction/TransactionDetail";
import usePageTitle from "../hooks/public/usePageTitle";
import ContactPage from "../pages/guest/contact/ContactPage";
import NewsDetail from "../pages/guest/news/NewsDetail";
import News from "../pages/guest/news/News";

import DashboardPage from "../pages/user/Profile/DashboardPage";
import CoursePage from "../pages/user/Profile/CoursePage";
import EventPage from "../pages/user/Profile/EventPage";
import CertificatePage from "../pages/user/Profile/CertificatePage";
import ReviewsPage from "../pages/user/Profile/ReviewsPage";
import TransactionsPage from "../pages/user/Profile/TransactionsPage";
import ExchangePage from "../pages/user/Profile/ExchangePage";
import ProfilePage from "../pages/user/Profile/ProfilePage";

import PreTes from "../pages/user/PreTes/tes";
import Exam from "../pages/user/PreTes/exam";
import TesResults from "../pages/user/PreTes/testResults";

import CourseModulePage from "../pages/user/module/CourseModulePage";
import DiscussionPage from "../pages/user/module/discussion/DiscussionPage";
import ForumDiscussionPage from "../pages/user/module/discussion/ForumDiscussionPage";
import TaskDetailPage from "../pages/user/module/task/TaskDetailPage";
import QuizPage from "../pages/user/module/quiztes/QuizPage";
import QuizResultPage from "../pages/user/module/quiztes/QuizResultPage";


function RouteChangeLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  usePageTitle();

  useEffect(() => {
    setLoading(true);
    setAnimateOut(false);

    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => setLoading(false), 200);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) return <Spinner animateOut={animateOut} />;

  return (
    <Routes>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/email" element={<ForgotPassword />} />
        <Route path="/update-password/email" element={<UpdatePassword />} />
      </Route>

      <Route element={<GuestLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/:slug" element={<CourseDetail />} />
        <Route path="/transaction/course/:slug" element={<TransactionPage />} />
        <Route path="/transaction/detail/:reference" element={<TransactionDetailPage />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/:slug" element={<EventDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/kelas-industri" element={<KelasIndustri />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/faq/:id" element={<FaqDetailPage />} />
        <Route path="/faq/category/:id" element={<FaqCategoryDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* user */}
        <Route path="/dashboard/user" element={<DashboardPage />} />
        <Route path="/dashboard/user/course" element={<CoursePage />} />
        <Route path="/dashboard/user/event" element={<EventPage />} />
        <Route path="/dashboard/user/certificate" element={<CertificatePage />} />
        <Route path="/dashboard/user/reviews" element={<ReviewsPage />} />
        <Route path="/dashboard/user/transaction" element={<TransactionsPage />} />
        <Route path="/dashboard/user/exchange" element={<ExchangePage />} />
        <Route path="/dashboard/user/profile" element={<ProfilePage />} />


        <Route path="/course/pre-tes/:slug" element={<PreTes />} />
        <Route path="/course/pre-tes/exam/:slug" element={<Exam />} />
        <Route path="/course/pre-tes/exam/results/:id" element={<TesResults />} />

        {/* contoh slug course */}
        <Route path="/module/:slug" element={<CourseModulePage />} />
        <Route path="/course/:courseSlug/module/:moduleIndex" element={<CourseModulePage />} />
        <Route path="/course/:courseSlug/submodule/:submoduleSlug" element={<CourseModulePage />} />
        <Route path="/course/:courseSlug/quiz/:quizSlug" element={<CourseModulePage />} />
        <Route path="/course/:courseSlug/task/:moduleId" element={<CourseModulePage />} />
        <Route path="/course/:courseSlug/final-audit" element={<CourseModulePage />} />
        <Route path="/module/discussion/:slug" element={<DiscussionPage />} />
        <Route path="/module/discussion/forum/:slug" element={<ForumDiscussionPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/quiz-result/:id" element={<QuizResultPage />} />

      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <RouteChangeLoader />
    </Router>
  );
}

export default App;
