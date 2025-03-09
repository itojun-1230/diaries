import { checkTodayDiary } from "./feature/checkTodayDiary";
import { checkDiaries } from "./feature/checkDiaries";

(global as any).checkTodayDiary = checkTodayDiary;
(global as any).checkDiaries = checkDiaries;
