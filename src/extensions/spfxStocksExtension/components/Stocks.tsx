import * as React from "react";
import * as moment from "moment";
import { IStock, IStocksProps, IStocksState } from "./IStocks";
import StockItem from "./StockItem";
import styles from './Stocks.module.scss';

const ALPHAVANTAGE_API_KEY = "REPLACEME";

export default class Stocks extends React.Component<IStocksProps, IStocksState> {
  private _stockItems: IStock[];

  constructor(props: IStocksProps) {
    super(props);

    this._stockItems = props.stockItems;

    this.state = {
      stockItemsData: []
    };
  }

  public componentDidMount() {
    this._generateStocksData();
  }

  private _generateStocksData() {
    this.props.stockItems.forEach(s => {
      let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${s.symbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          let lastRefreshedDate = json["Meta Data"]["3. Last Refreshed"];
          let lastRefreshedItem = json["Time Series (Daily)"][lastRefreshedDate];

          this.setState({
            stockItemsData: [...this.state.stockItemsData, {
              open: lastRefreshedItem["1. open"],
              close: lastRefreshedItem["4. close"],
              date: moment(lastRefreshedDate, 'YYYY-MM-DD').toDate(),
              symbol: s.symbol,
              name: s.name
            }]
          });
        });
    });    
  }

  public render(): React.ReactElement<IStocksProps> {
    return (
      <div className="ms-bgColor-white">
        <ul className={styles.stocks}>
          {this.state.stockItemsData.map((itemData) =>           
            <StockItem
              key={itemData.symbol}
              stockItemData={itemData}
            />
          )}          
        </ul>
      </div >
    );
  }
}