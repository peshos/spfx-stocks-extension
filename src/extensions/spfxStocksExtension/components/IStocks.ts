import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface IStocksProps {
  context: ApplicationCustomizerContext;
  stockItems: IStock[];
}

export interface IStocksState {
  stockItemsData: IStockData[];
}

export interface IStockItemProps {
  stockItemData: IStockData;
}

export interface IStock {
  symbol: string;
  name: string;
}

export interface IStockData {
  open: string;
  close: string;
  date: Date;
  symbol: string;
  name: string;
}