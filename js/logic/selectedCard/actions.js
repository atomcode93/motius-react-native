export const SELECT_CARD = 'SELECT_CARD';

export function selectCard(fileID) {
  return {
    type: SELECT_CARD,
    payload: fileID
  };
}
