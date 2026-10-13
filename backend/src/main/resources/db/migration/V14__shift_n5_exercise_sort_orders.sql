-- V14__shift_n5_exercise_sort_orders.sql
-- Cập nhật thứ tự sort_order cho các bài tập N5 từ Bài 03 trở đi sau khi đã tách Bài 02

UPDATE exercises e
JOIN lessons ls ON e.lesson_id = ls.id
JOIN levels lv ON ls.level_id = lv.id
SET e.sort_order = e.sort_order + 1
WHERE lv.code = 'N5'
  AND e.sort_order >= 2
  AND e.title <> 'Bài 02'
  AND EXISTS (
      SELECT 1 FROM (
          SELECT ex.id FROM exercises ex
          JOIN lessons lss ON ex.lesson_id = lss.id
          JOIN levels lvv ON lss.level_id = lvv.id
          WHERE lvv.code = 'N5' AND ex.title = 'Bài 03' AND ex.sort_order = 2
      ) tmp
  );
