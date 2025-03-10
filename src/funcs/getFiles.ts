/**
 * フォルダ内のファイルを取得する
 * @param {GoogleAppsScript.Drive.Folder} folder - 対象のフォルダ
 * @param {(file: GoogleAppsScript.Drive.File) => boolean} [filter] - ファイルをフィルタリングする関数
 * @returns {GoogleAppsScript.Drive.File[]} フィルタリングされたファイルの配列
 * 
 * @example
 * // すべてのファイルを取得
 * const allFiles = getFiles(folder);
 * 
 * // Markdownファイルのみを取得
 * const mdFiles = getFiles(folder, file => file.getMimeType() === "text/markdown");
 * 
 * // 特定の日付以降に更新されたファイルを取得
 * const date = new Date("2024-03-01");
 * const recentFiles = getFiles(folder, file => file.getLastUpdated() >= date);
 */
export const getFiles = (
    folder: GoogleAppsScript.Drive.Folder,
    filter?: (file: GoogleAppsScript.Drive.File) => boolean
): GoogleAppsScript.Drive.File[] => {
    const files = folder.getFiles();
    const fileList: GoogleAppsScript.Drive.File[] = [];

    while (files.hasNext()) {
        const file = files.next();
        if (!filter || filter(file)) {
            fileList.push(file);
        }
    }
    return fileList;
};