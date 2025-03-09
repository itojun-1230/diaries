import { projectFolder } from "@/utils/projectFolder";

export const moveDiary = (targetFile: GoogleAppsScript.Drive.File) => {
    const currentFolder = projectFolder();

    // 日記の作成日を取得
    const diaryCreatedDate = targetFile.getDateCreated();

    // 移動先を取得
    const yearFolders = currentFolder.getFoldersByName(diaryCreatedDate.getFullYear().toString());
    let yearFolder: GoogleAppsScript.Drive.Folder;
    if (yearFolders.hasNext()) {
        yearFolder = yearFolders.next();
    }else {
        yearFolder = currentFolder.createFolder(diaryCreatedDate.getFullYear().toString());
    }

    const monthFolders = yearFolder.getFoldersByName((diaryCreatedDate.getMonth() + 1).toString().padStart(2, "0"));
    let monthFolder: GoogleAppsScript.Drive.Folder;
    if (monthFolders.hasNext()) {
        monthFolder = monthFolders.next();
    }else {
        monthFolder = yearFolder.createFolder((diaryCreatedDate.getMonth() + 1).toString().padStart(2, "0"));
    }

    // 日記を移動
    targetFile.moveTo(monthFolder);
}
