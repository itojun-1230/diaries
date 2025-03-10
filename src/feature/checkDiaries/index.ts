import { projectFolder } from "@/utils/projectFolder";
import { isDiaryUpdated } from "@/funcs/isDiaryUpdated";
import { moveDiary } from "../moveDiary";
import { replaceKeyword } from "../replaceKeyword";

/**
 * 日記を確認し、更新されている場合は移動する
 */
export const checkDiaries = async () => {
    const currentFolder = projectFolder();
    const diaries = currentFolder.getFiles();
    while(diaries.hasNext()) {
        const diary = diaries.next();
        const fileName = diary.getName();
        // ファイル名が日記 yyyy-mm-dd.md の形式であるか確認
        if(!fileName.match(/^日記 \d{4}-\d{2}-\d{2}\.md$/)) {
            continue;
        }
        
        // 今日の日記は更新しない
        const today = new Date();
        const diaryDate = new Date(fileName.split(" ")[1]);
        if(diaryDate.getFullYear() === today.getFullYear() && diaryDate.getMonth() === today.getMonth() && diaryDate.getDate() === today.getDate()) {
            continue;
        }

        
        if(isDiaryUpdated(diary)) {
            await replaceKeyword(diary);
            moveDiary(diary);
        }
    }
}