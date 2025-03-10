import { getKeywordsFromFile } from "../getKeywordsFromFile";

/**
 * 日記ファイルの内容をキーワードで置換する
 * @param {GoogleAppsScript.Drive.File} diaryFile - 日記ファイル
 * @returns {GoogleAppsScript.Drive.File} 置換後の日記ファイル
 */
export const replaceKeyword = async (diaryFile: GoogleAppsScript.Drive.File) => {
    const keywords = (await getKeywordsFromFile(diaryFile)).sort((a, b) => b.length - a.length);
    let content = diaryFile.getBlob().getDataAsString();
    for (const keyword of keywords) {
        content = content.replace(keyword, `[[${keyword}]]`);
    }
    diaryFile.setContent(content);
}