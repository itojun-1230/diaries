export const projectFolder = () => {
    const folderId = PropertiesService.getScriptProperties().getProperty("PROJECT_FOLDER_ID");
    if (!folderId) {
        throw new Error("PROJECT_FOLDER_ID is not set");
    }
    const folder = DriveApp.getFolderById(folderId);
    if (!folder) {
        throw new Error("PROJECT_FOLDER_ID is invalid");
    }
    return folder;
}