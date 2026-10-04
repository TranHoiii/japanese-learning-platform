import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LessonsPage from "./pages/LessonsPage";
import VocabularyPage from "./pages/VocabularyPage";
import VocabularyDetailPage from "./pages/VocabularyDetailPage";
import GrammarPage from "./pages/GrammarPage";
import GrammarDetailPage from "./pages/GrammarDetailPage";
import KanjiPage from "./pages/KanjiPage";
import KanjiDetailPage from "./pages/KanjiDetailPage";
import ListeningPage from "./pages/ListeningPage";
import ListeningDetailPage from "./pages/ListeningDetailPage";
import ReadingPage from "./pages/ReadingPage";
import ReadingDetailPage from "./pages/ReadingDetailPage";
import ExercisePage from "./pages/ExercisePage";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import ProgressPage from "./pages/ProgressPage";
import ReviewPage from "./pages/ReviewPage";
import FavoritePage from "./pages/FavoritePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/favorites" element={<FavoritePage />} />
      <Route path="/n5" element={<Navigate to="/n5/lessons" replace />} />
      <Route path="/n5/lessons" element={<LessonsPage />} />
      <Route path="/n5/exercises" element={<ExercisePage />} />
      <Route path="/n5/lessons/:lessonId" element={<VocabularyPage />} />
      <Route path="/n5/lessons/:lessonId/vocabulary" element={<VocabularyPage />} />
      <Route path="/n5/lessons/:lessonId/grammar" element={<GrammarPage />} />
      <Route path="/n5/lessons/:lessonId/kanji" element={<KanjiPage />} />
      <Route path="/n5/lessons/:lessonId/listening" element={<ListeningPage />} />
      <Route path="/n5/lessons/:lessonId/reading" element={<ReadingPage />} />
      <Route path="/n5/lessons/:lessonId/exercise" element={<ExercisePage />} />
      <Route path="/n5/lessons/:lessonId/exercises" element={<ExercisePage />} />
      <Route path="/vocabulary/:id" element={<VocabularyDetailPage />} />
      <Route path="/grammar/:id" element={<GrammarDetailPage />} />
      <Route path="/kanjis/:id" element={<KanjiDetailPage />} />
      <Route path="/listenings/:id" element={<ListeningDetailPage />} />
      <Route path="/readings/:id" element={<ReadingDetailPage />} />
      <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
