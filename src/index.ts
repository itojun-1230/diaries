import { createDiary } from "./feature/createDiary";
import { moveDiary } from "./feature/moveDiary";

(global as any).createDiary = createDiary;
(global as any).moveDiary = moveDiary;