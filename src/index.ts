import { checkTodayDiary } from "./feature/checkTodayDiary";
import { checkDiaries } from "./feature/checkDiaries";
import { checkKeywords } from "./feature/checkKeywords";

(global as any).checkTodayDiary = checkTodayDiary;
(global as any).checkDiaries = checkDiaries;
(global as any).checkKeywords = checkKeywords;