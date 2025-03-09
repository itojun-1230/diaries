import { getDiaryFileName } from "@/funcs/getDiaryFileName";
import { projectFolder } from "@/utils/projectFolder";
import { createDiary } from "@/feature/createDiary";
import { LINE } from "@/feature/line";
import { isDiaryUpdated } from "@/funcs/isDiaryUpdated";
import { moveDiary } from "../moveDiary";

export const checkTodayDiary = () => {
    const accessToken = PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN");
    if (!accessToken) {
        throw new Error("LINE_ACCESS_TOKEN is not set");
    }
    const line = new LINE(accessToken);

    const userId = PropertiesService.getScriptProperties().getProperty("LINE_USER_ID");
    if (!userId) {
        throw new Error("LINE_USER_ID is not set");
    }

    const currentFolder = projectFolder();
    const todayDiaryName = getDiaryFileName();
    const todayDiaries = currentFolder.getFilesByName(todayDiaryName);
    const todayDiary = todayDiaries.hasNext() ? todayDiaries.next() : createDiary();

    const today = new Date();
    let message = "";

    if(isDiaryUpdated(todayDiary)) {
        message = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日の日記を確認しました！一日お疲れ様でした！`;
        moveDiary(todayDiary);
    }else {
        message = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日の日記はお済みですか・・・?\nObsidianに日記を書いて、\n一日の事を振り返ってみませんか？`;
    }
    line.send(userId, message);
}
