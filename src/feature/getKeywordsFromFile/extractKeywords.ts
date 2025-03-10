import { Gemini } from "@/feature/gemini";

/**
 * 日記の内容からキーワードを抽出する
 * @param {string} content - 日記の内容
 * @returns {Promise<string[]>} 抽出されたキーワードの配列
 */
export const extractKeywords = async (content: string): Promise<string[]> => {
    const prompt = `
以下の日記の内容から、重要な短いキーワードを抽出してください。ただし、キーワードは固有名詞や人名などである必要があります。
回答は、キーワードのみをカンマ区切りで返してください。また、省略や誤字などがある場合は、修正してください。

日記の内容：
${content}
`;

    const geminiApiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
    if (!geminiApiKey) {
        throw new Error("Gemini APIKey is not set");
    }

    const gemini = new Gemini(geminiApiKey);
    const response = await gemini.generateText(prompt);
    // カンマで区切られた文字列を配列に変換し、各要素の前後の空白を削除
    const keywords = response.split(',').map(keyword => keyword.trim());
    return keywords;
};