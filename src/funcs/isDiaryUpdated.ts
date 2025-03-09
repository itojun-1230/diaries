/**
 * 指定されたファイルが作成後に更新されているかを確認する
 * @param {GoogleAppsScript.Drive.File} targetFile - 確認する日記ファイル
 * @returns {boolean} 更新されている場合はtrue、更新されていない場合はfalse
 */
export const isDiaryUpdated = (targetFile: GoogleAppsScript.Drive.File): boolean => {
    const createdTime = targetFile.getDateCreated().getTime();
    const updatedTime = targetFile.getLastUpdated().getTime();

    // 作成時刻と最終更新時刻を比較
    // 1秒以上の差がある場合は更新されたとみなす
    return (updatedTime - createdTime) > 1000;
}; 