export interface ChartXY {
  x: number|Date;
  y: number;
}

export type ChartData = ChartXY[];

export type month = '01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12';
export type day = '01'|'02'|'03'|'04'|'05'|'06'|'07'|
                  '08'|'09'|'10'|'11'|'12'|'13'|'14'|
                  '15'|'16'|'17'|'18'|'19'|'20'|'21'|
                  '22'|'23'|'24'|'25'|'26'|'27'|'28'|
                  '29'|'30'|'31';
export type year = '2016';

export interface Post {
  title: string;
  subTitle: string;
  date: `${year}-${month}-${day}`;
  url: string;
  description: string;
  chart: ChartData;
}
