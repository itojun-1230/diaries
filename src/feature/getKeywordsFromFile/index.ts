import { extractKeywords } from "./extractKeywords";

/**
 * 指定されたファイルの内容からキーワードを抽出する
 * @param {GoogleAppsScript.Drive.File} file - 日記ファイル
 * @returns {Promise<string[]>} 抽出されたキーワードの配列
 */
export const getKeywordsFromFile = async (file: GoogleAppsScript.Drive.File): Promise<string[]> => {
    try {
        const content = file.getBlob().getDataAsString();
        return await extractKeywords(content);
    } catch (error) {
        console.error('ファイルからのキーワード抽出中にエラーが発生しました:', error);
        return [];
    }
}; 