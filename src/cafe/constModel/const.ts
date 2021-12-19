//typescript용 enum 지정
export enum Day {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}
export enum Theme {
  MOOD = 'MOOD',
  WORK = 'WORK',
  TASTE = 'TASTE',
}

//enum value 선언
export type DayType = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type ThemeType = 'MOOD' | 'WORK' | 'TASTE';
