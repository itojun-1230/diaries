import { projectFolder } from "@/utils/projectFolder";

export const moveDiary = (targetFile: GoogleAppsScript.Drive.File) => {
    const currentFolder = projectFolder();

    // 日記の作成日を取得
    const diaryCreatedDate = targetFile.getDateCreated();

    // 移動先を取得
    const yearFoldeies = currentFolder.getFoldersByName(diaryCreatedDate.getFullYear().toString());
    let yearFolder: GoogleAppsScript.Drive.Folder;
    if (yearFoldeies.hasNext()) {
        yearFolder = yearFoldeies.next();
    }else {
        yearFolder = currentFolder.createFolder(diaryCreatedDate.getFullYear().toString());
    }

    const monthFoldeies = yearFolder.getFoldersByName((diaryCreatedDate.getMonth() + 1).toString().padStart(2, "0"));
    let monthFolder: GoogleAppsScript.Drive.Folder;
    if (monthFoldeies.hasNext()) {
        monthFolder = monthFoldeies.next();
    }else {
        monthFolder = yearFolder.createFolder((diaryCreatedDate.getMonth() + 1).toString().padStart(2, "0"));
    }

    // 日記を移動
    targetFile.moveTo(monthFolder);
}

