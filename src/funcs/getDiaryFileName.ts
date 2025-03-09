/**
 * 指定された日数分前後の日付を「日記 yyyy-mm-dd.md」という形式で返す関数
 * @param {number} offset - 現在の日付からの相対的な日数（正数：未来の日付、負数：過去の日付、0：現在の日付）
 * @returns {string} 日記のファイル名
 */
export const getDiaryFileName = (offset: number = 0): string => {
    const date = new Date();
    // JSTでの日付を取得
    const jstDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));
    jstDate.setDate(jstDate.getDate() + offset);

    const year = jstDate.getFullYear();
    const month = String(jstDate.getMonth() + 1).padStart(2, '0');
    const day = String(jstDate.getDate()).padStart(2, '0');

    return `日記 ${year}-${month}-${day}.md`;
}; 