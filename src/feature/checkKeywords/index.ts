import { getFiles } from "@/funcs/getFiles";
import { projectFolder } from "@/utils/projectFolder"
import { Gemini } from "../gemini";
import { LINE } from "@/feature/line";

/**
 * キーワードファイルを作成する
 */
/**
 * キーワードファイルを作成・更新する関数
 * 
 * 以下の処理を行う:
 * 1. プロジェクトフォルダ内の「キーワード」フォルダを取得
 * 2. 空のキーワードファイルを検索
 * 3. Gemini APIを使用して各キーワードの解説を生成
 * 4. 生成した解説をファイルに保存
 * 
 * @throws {Error} キーワードフォルダが見つからない場合
 * @throws {Error} Gemini APIキーが設定されていない場合
 */
export const checkKeywords = () => {
    // プロジェクトフォルダから「キーワード」フォルダを取得
    const currentFolder = projectFolder();
    const keywordFolders = currentFolder.getFoldersByName("キーワード");
    if (!keywordFolders.hasNext()) {
        throw new Error("keyword folder not found");
    }
    const keywordFolder = keywordFolders.next();

    // 解説が書かれていないキーワードファイルを取得
    const keywordFiles = getFiles(keywordFolder, (file) => file.getBlob().getDataAsString() === "");
    
    // Gemini APIキーを取得
    const geminiApiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
    if (!geminiApiKey) {
        throw new Error("GEMINI_API_KEY is not set");
    }
    const gemini = new Gemini(geminiApiKey);

    // LINE APIキーを取得
    const lineApiKey = PropertiesService.getScriptProperties().getProperty("LINE_ACCESS_TOKEN");
    if (!lineApiKey) {
        throw new Error("LINE_ACCESS_TOKEN is not set");
    }
    // userIdを取得
    const userId = PropertiesService.getScriptProperties().getProperty("LINE_USER_ID");
    if (!userId) {
        throw new Error("LINE_USER_ID is not set");
    }
    const line = new LINE(lineApiKey);

    // Gemini APIを使用して各キーワードの解説を生成
    keywordFiles.forEach(async (file) => {
        const fileName = file.getName();
        const message = `「${fileName.split(".")[0]}」とは何ですか？簡潔に説明してください。100文字以上で回答してください。`;
        const response = await gemini.generateText(message);
        file.setContent(response);

        line.send(userId, `「${fileName.split(".")[0]}」の解説を作成しました。\n\n${response}`);
    });
}
