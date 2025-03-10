import { getKeywordsFromFile } from "../getKeywordsFromFile";

/**
 * キーワードを[[keyword]]の形式に置換する
 * すでに[[]]で囲まれているキーワードはスキップする
 * @param content 置換対象のテキスト
 * @param keyword 置換するキーワード
 * @returns 置換後のテキスト
 */
const replaceKeywordWithBrackets = (content: string, keyword: string): string => {
    // すでに[[keyword]]の形式になっているものを検出する正規表現
    const wrappedPattern = new RegExp(`\\[\\[${keyword}\\]\\]`);

    // すでに[[]]で囲まれている場合はスキップ
    if (wrappedPattern.test(content)) {
        return content;
    }

    return content.replace(keyword, `[[${keyword}]]`);
};

/**
 * テキスト内のキーワードを[[keyword]]の形式に置換する
 * @param content 置換対象のテキスト
 * @param keywords 置換するキーワードの配列
 * @returns 置換後のテキスト
 */
export const replaceKeywords = (content: string, keywords: string[]): string => {
    let result = content;
    for (const keyword of keywords) {
        result = replaceKeywordWithBrackets(result, keyword);
    }
    return result;
};

/**
 * 日記ファイルの内容をキーワードで置換する
 * @param {GoogleAppsScript.Drive.File} diaryFile - 日記ファイル
 * @returns {GoogleAppsScript.Drive.File} 置換後の日記ファイル
 */
export const replaceKeyword = async (diaryFile: GoogleAppsScript.Drive.File) => {
    const keywords = (await getKeywordsFromFile(diaryFile)).sort((a, b) => b.length - a.length);
    let content = diaryFile.getBlob().getDataAsString();
    for (const keyword of keywords) {
        content = replaceKeywordWithBrackets(content, keyword);
    }
    diaryFile.setContent(content);
}