import * as React from "react";
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  Placeholder
} from '@microsoft/sp-application-base';
import { IStock, IStocksProps } from './components/IStocks';
import Stocks from './components/Stocks';

import * as strings from 'spfxStocksExtensionStrings';

const LOG_SOURCE: string = 'SpfxStocksExtensionApplicationCustomizer';
const HeaderPlaceholderName: string = "PageHeader";
const STOCKS: IStock[] = [{ symbol: "MSFT", name: "Microsoft Corporation" }, { symbol: "AAPL", name: "Apple Inc." }];

export interface ISpfxStocksExtensionApplicationCustomizerProperties {
  stocks: IStock[];
}

export default class SpfxStocksExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<ISpfxStocksExtensionApplicationCustomizerProperties> {

  private _headerPlaceholder: Placeholder;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    return Promise.resolve<void>();
  }

  @override
  public onRender(): void {
    if (!this._headerPlaceholder && this.context.placeholders.placeholderNames.indexOf(HeaderPlaceholderName) !== -1) {

      this._headerPlaceholder = this.context.placeholders.tryAttach(HeaderPlaceholderName, {
        onDispose: this._onDispose
      });

      if (!this._headerPlaceholder) {
        console.error('The expected placeholder (PageHeader) was not found.');
        return;
      }

      if (this._headerPlaceholder.domElement) {
        const element: React.ReactElement<IStocksProps> = React.createElement(
          Stocks,
          {
            context: this.context,
            stockItems: STOCKS
          }
        );
        ReactDom.render(element, this._headerPlaceholder.domElement);
      }
    }
  }

  private _onDispose(): void {
    console.log('[CustomHeader._onDispose] Disposed custom header.');
  }
}
