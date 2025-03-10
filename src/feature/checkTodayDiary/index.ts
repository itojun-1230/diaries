import { getDiaryFileName } from "@/funcs/getDiaryFileName";
import { projectFolder } from "@/utils/projectFolder";
import { createDiary } from "@/feature/createDiary";
import { LINE } from "@/feature/line";
import { isDiaryUpdated } from "@/funcs/isDiaryUpdated";
import { moveDiary } from "../moveDiary";
import { replaceKeyword } from "../replaceKeyword";

/**
 * 今日の日記を確認し、LINEで通知を送信する
 * 
 * 以下の処理を行う:
 * 1. LINE通知に必要なアクセストークンとユーザーIDを取得
 * 2. 今日の日記ファイルを取得（存在しない場合は新規作成）
 * 3. 日記の更新状態を確認
 * 4. 更新状態に応じたメッセージをLINEで送信
 */
export const checkTodayDiary = async () => {
    // LINEのアクセストークンを取得
    const accessToken = PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN");
    if (!accessToken) {
        throw new Error("LINE_ACCESS_TOKEN is not set");
    }
    const line = new LINE(accessToken);

    // LINE通知先のユーザーIDを取得
    const userId = PropertiesService.getScriptProperties().getProperty("LINE_USER_ID");
    if (!userId) {
        throw new Error("LINE_USER_ID is not set");
    }

    // 今日の日記ファイルを取得または作成
    const currentFolder = projectFolder();
    const todayDiaryName = getDiaryFileName();
    const todayDiaries = currentFolder.getFilesByName(todayDiaryName);
    const todayDiary = todayDiaries.hasNext() ? todayDiaries.next() : createDiary();

    // 日付情報を取得
    const today = new Date();
    let message = "";

    // 日記の更新状態に応じてメッセージを設定
    if(isDiaryUpdated(todayDiary)) {
        // 日記が更新されている場合は完了メッセージを設定し、日記を移動
        message = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日の日記を確認しました！一日お疲れ様でした！`;
        await replaceKeyword(todayDiary);
        moveDiary(todayDiary);
    }else {
        // 日記が更新されていない場合は催促メッセージを設定
        message = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日の日記はお済みですか・・・?\nObsidianに日記を書いて、\n一日の事を振り返ってみませんか？`;
    }

    // LINEでメッセージを送信
    line.send(userId, message);
}
