import { getDiaryFileName } from "../getDiaryFileName";

/**
 * 日記を作成する
 * @param {number} offset - 現在の日付からの相対的な日数（正数：未来の日付、負数：過去の日付、0：現在の日付）
 */
export const createDiary = (offset: number = 0): void => {
    const folderId = PropertiesService.getScriptProperties().getProperty("PROJECT_FOLDER_ID") || "";
    const currentFolder = DriveApp.getFolderById(folderId);

    // テンプレートファイルを取得
    const templateFile = currentFolder.getFilesByName("日記テンプレート.md").next();
    let templateContent = templateFile.getBlob().getDataAsString();
    
    // テンプレートファイルの日付をリプレイス
    const replaceContents = {
        '<% tp.date.now("YYYY-MM-DD", -7, tp.file.title, "YYYY-MM-DD") %>]': getDiaryFileName(-7),
        '<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>': getDiaryFileName(-1),
        '<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>': getDiaryFileName(1),
        '<% tp.date.now("YYYY-MM-DD", 7, tp.file.title, "YYYY-MM-DD") %>': getDiaryFileName(7)
    }

    for (const [key, value] of Object.entries(replaceContents)) {
        templateContent = templateContent.replace(key, value);
    }

    const fileName = getDiaryFileName(offset);
    currentFolder.createFile(fileName, templateContent, "text/markdown");
};