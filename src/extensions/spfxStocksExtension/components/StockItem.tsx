import * as React from "react";
import * as moment from "moment";
import { IStockItemProps } from "./IStocks";
import styles from "./StockItem.module.scss";

export default class StockItem extends React.Component<IStockItemProps, {}> {
    constructor(props: IStockItemProps) {
        super(props);
    }

    private displayDate:string = moment(this.props.stockItemData.date).format("DD MMM");
    private arrowClassName:string = this.getArrowClassName();
    private stockDifference: string = this.getStockDifference();

    public render(): React.ReactElement<IStockItemProps> {
        return (
            <li className={styles.stockItem}>
                <div className="ms-fontSize-l">{this.props.stockItemData.name}</div>
                <div className="ms-fontSize-s">SWF: {this.props.stockItemData.symbol} - {this.displayDate}</div>
                <div>
                    <span className="ms-fontSize-xxl">${parseFloat(this.props.stockItemData.close).toFixed(2)}</span>
                    <span className={styles.marginLeft5}><b className="ms-fontSize-m">{this.stockDifference}</b><i className={this.arrowClassName} aria-hidden="true"></i></span>
                </div>
            </li>
        );
    }

    private getArrowClassName(): string {
        let diff: number = parseFloat(this.props.stockItemData.close) - parseFloat(this.props.stockItemData.open);
        let toReturn: string = "";
        if (diff > 0) {
            toReturn = "ms-Icon ms-Icon--Up ms-fontColor-green";
        } else if (diff < 0) {
            toReturn = "ms-Icon ms-Icon--Down ms-fontColor-red";
        }
        return toReturn;
    }

    private getStockDifference(): string {
        let diffInPerc: number = ((parseFloat(this.props.stockItemData.close) - parseFloat(this.props.stockItemData.open)) / parseFloat(this.props.stockItemData.open)) * 100;
        return "%" + diffInPerc.toFixed(2);
    }
}