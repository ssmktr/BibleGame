export type GameType = "creed" | "prayer";

export const CREED_SENTENCES = [
  "나는 전능하신 아버지 하나님, 천지의 창조주를 믿습니다",
  "나는 그의 유일하신 아들, 우리 주 예수그리스도를 믿습니다",
  "그는 성령으로 잉태되어 동정녀 마리아에게서 나시고",
  "본디오 빌라도에게 고난을 받아 십자가에 못 박혀 죽으시고",
  "장사된 지 사흘 만에 죽은 자 가운데서 다시 살아나셨으며",
  "하늘에 오르시어 전능하신 아버지 하나님 우편에 앉아 계시다가",
  "거기로부터 살아 있는 자와 죽은 자를 심판하러 오십니다",
  "나는 성령을 믿으며, 거룩한 공교회와 성도의 교제와",
  "죄를 용서받는 것과 몸의 부활과 영생을 믿습니다",
];

export const PRAYER_SENTENCES = [
  "하늘에 계신 우리 아버지",
  "아버지의 이름을 거룩하게 하시며",
  "아버지의 나라가 오게 하시며",
  "아버지의 뜻이 하늘에서와 같이 땅에서도 이루어지게 하소서",
  "오늘 우리에게 일용할 양식을 주시고",
  "우리가 우리에게 잘못한 사람을 용서하여 준 것같이",
  "우리 죄를 용서하여 주시고",
  "우리를 시험에 빠지지않게 하시고 악에서 구하소서",
  "나라와 권능과 영광이 영원히 아버지의 것입니다",
];

export const GAME_LABELS: Record<GameType, string> = {
  creed: "사도신경",
  prayer: "주기도문",
};

export function getSentences(type: GameType): string[] {
  return type === "creed" ? CREED_SENTENCES : PRAYER_SENTENCES;
}
