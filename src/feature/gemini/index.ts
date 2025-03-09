
/**
 * Gemini APIを使用してテキストを生成するクラス
 */
export class Gemini {
    constructor(private readonly apiKey: string) {}

    /**
     * テキストを生成する
     * @param message 生成するテキストの内容
     * @returns 生成されたテキスト
     */
    async generateText(message: string) {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`, {
            method: "POST",
            body: JSON.stringify({
                "contents": [
                    {
                        "parts": [
                            {
                                "text": message
                            }
                        ]
                    }
                ],
                "tools": [
                    {
                        "google_search": {}
                    }
                ]
            }),
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }
}