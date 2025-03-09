/**
 * 指定された日数分前後の日付を「日記 yyyy-mm-dd.md」という形式で返す関数
 * @param {number} offset - 現在の日付からの相対的な日数（正数：未来の日付、負数：過去の日付、0：現在の日付）
 * @returns {string} 日記のファイル名
 */
export const getDiaryFileName = (offset: number = 0): string => {
    const date = new Date();
    date.setDate(date.getDate() + offset);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `日記 ${year}-${month}-${day}.md`;
}; 