import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import VocabularyPage from "./pages/VocabularyPage";
import VocabularyDetailPage from "./pages/VocabularyDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/n5" element={<Navigate to="/n5/lessons" replace />} />
      <Route path="/n5/lessons" element={<LessonsPage />} />
      <Route path="/n5/lessons/:lessonId" element={<VocabularyPage />} />
      <Route path="/n5/lessons/:lessonId/vocabulary" element={<VocabularyPage />} />
      <Route path="/vocabulary/:id" element={<VocabularyDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
