import { checkTodayDiary } from "./feature/checkTodayDiary";
import { checkDiaries } from "./feature/checkDiaries";
import { extractKeywords } from "./feature/getKeywordsFromFile";

(global as any).checkTodayDiary = checkTodayDiary;
(global as any).checkDiaries = checkDiaries;