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
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import BeginnerPage from "./pages/BeginnerPage";
import {
  HiraganaPage,
  KatakanaPage,
  PronunciationOverviewPage,
  PronunciationTopicPage,
  NumbersPage,
  PracticePage,
} from "./features/beginner";
import N4Page from "./pages/N4Page";
import HandbookPage from "./pages/HandbookPage";
import {
  HandbookCategoryPage,
  HandbookArticleDetailPage,
} from "./features/handbook";

// Admin CMS
import RequireAdmin from "./components/RequireAdmin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLevelsPage from "./pages/admin/AdminLevelsPage";
import AdminLessonsPage from "./pages/admin/AdminLessonsPage";
import AdminVocabulariesPage from "./pages/admin/AdminVocabulariesPage";
import AdminGrammarsPage from "./pages/admin/AdminGrammarsPage";
import AdminKanjisPage from "./pages/admin/AdminKanjisPage";
import AdminListeningsPage from "./pages/admin/AdminListeningsPage";
import AdminReadingsPage from "./pages/admin/AdminReadingsPage";
import AdminExercisesPage from "./pages/admin/AdminExercisesPage";

export default function App() {
  return (
    <Routes>
      {/* Learner Public & Protected Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/beginner" element={<BeginnerPage />} />
      <Route path="/beginner/hiragana" element={<HiraganaPage />} />
      <Route path="/beginner/katakana" element={<KatakanaPage />} />
      <Route path="/beginner/pronunciation" element={<PronunciationOverviewPage />} />
      <Route path="/beginner/pronunciation/:topicSlug" element={<PronunciationTopicPage />} />
      <Route path="/beginner/numbers" element={<NumbersPage />} />
      <Route path="/beginner/practice" element={<PracticePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/favorites" element={<FavoritePage />} />
      <Route path="/handbook" element={<HandbookPage />} />
      <Route path="/handbook/:category" element={<HandbookCategoryPage />} />
      <Route path="/handbook/:category/:slug" element={<HandbookArticleDetailPage />} />
      <Route path="/levels/n5" element={<Navigate to="/n5/lessons" replace />} />
      <Route path="/levels/n4" element={<Navigate to="/n4/lessons" replace />} />
      <Route path="/n5" element={<Navigate to="/n5/lessons" replace />} />
      <Route path="/n5/lessons" element={<LessonsPage />} />
      <Route path="/n5/exercises" element={<ExercisePage />} />
      <Route path="/lessons/:lessonId" element={<VocabularyPage />} />
      <Route path="/n5/lessons/:lessonId" element={<VocabularyPage />} />
      <Route path="/n5/lessons/:lessonId/vocabulary" element={<VocabularyPage />} />
      <Route path="/n5/lessons/:lessonId/grammar" element={<GrammarPage />} />
      <Route path="/n5/lessons/:lessonId/kanji" element={<KanjiPage />} />
      <Route path="/n5/lessons/:lessonId/listening" element={<ListeningPage />} />
      <Route path="/n5/lessons/:lessonId/reading" element={<ReadingPage />} />
      <Route path="/n5/lessons/:lessonId/exercise" element={<ExercisePage />} />
      <Route path="/n5/lessons/:lessonId/exercises" element={<ExercisePage />} />

      {/* N4 Routes */}
      <Route path="/n4" element={<Navigate to="/n4/lessons" replace />} />
      <Route path="/n4/lessons" element={<LessonsPage />} />
      <Route path="/n4/lessons/:lessonId" element={<VocabularyPage />} />
      <Route path="/n4/lessons/:lessonId/vocabulary" element={<VocabularyPage />} />
      <Route path="/vocabulary/:id" element={<VocabularyDetailPage />} />
      <Route path="/grammar/:id" element={<GrammarDetailPage />} />
      <Route path="/kanjis/:id" element={<KanjiDetailPage />} />
      <Route path="/listenings/:id" element={<ListeningDetailPage />} />
      <Route path="/readings/:id" element={<ReadingDetailPage />} />
      <Route path="/exercises/:id" element={<ExerciseDetailPage />} />

      {/* Admin CMS Routes (Protected by RequireAdmin) */}
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="levels" element={<AdminLevelsPage />} />
          <Route path="lessons" element={<AdminLessonsPage />} />
          <Route path="vocabularies" element={<AdminVocabulariesPage />} />
          <Route path="grammars" element={<AdminGrammarsPage />} />
          <Route path="kanjis" element={<AdminKanjisPage />} />
          <Route path="listenings" element={<AdminListeningsPage />} />
          <Route path="readings" element={<AdminReadingsPage />} />
          <Route path="exercises" element={<AdminExercisesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
