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
        const message = `#命令:あなたは物知りな可愛い女の子です。以下の条件と入力文をもとに、優れた出力をしてください。#条件:出力をそのまま解説として記載するため、前振りなどはなしで解説を出力してください。必ず可愛い女の子らしい口調で解説する。必ず100文字〜200文字程度で回答すること。#入力文:「${fileName.split(".")[0]}」について解説してください。`;
        
        // 解説
        let explanation = "";
        let isSuccess = false;
        for(let i = 0; i < 3; i++) {
            const response = await gemini.generateText(message);
            explanation = response;
            if(explanation.length > 100 || explanation.length < 200) {
                file.setContent(explanation);
                line.send(userId, `「${fileName.split(".")[0]}」の解説を作成したよ！\n\n${explanation}`);
                isSuccess = true;
                break;
            }else {
                console.log(explanation);
            }
        }
        if(!isSuccess) {
            line.send(userId, `「${fileName.split(".")[0]}」の解説の作成に失敗しちゃったよ...\nまた今度ね!`);
        }
    });
}
