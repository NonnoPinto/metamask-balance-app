import { AfterViewInit, Component, EventEmitter, HostListener, Injectable} from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  title = 'metamask-balance-app';
  private web3: Web3 = new Web3(Web3.givenProvider);

  constructor() {}

  metaAccess: any;
  access : any;
  ethereumButton : any;
  balanceButton : any;
  balance : any;
  _balance : any;
  showAccount : any;
  showBalance : any;

  ngAfterViewInit(): void {
    this.showAccount = document.querySelector('.showAccount');
    this.showBalance = document.querySelector('.showBalance');
    this.ethereumButton = document.querySelector('.enableEthereumButton');
    this.balanceButton = document.querySelector('.showMyBalance');
    this.ethereumButton.addEventListener("click", () => {this.getAccount();});
    this.balanceButton.addEventListener("click", () => {this.myGetBalance();});
  }

  async getAccount(){
    //-->Indirizzo<--
    this.metaAccess= window;
    this.access = await this.metaAccess.ethereum.request({method: 'eth_requestAccounts'});
    this.access = this.access[0];
    this.showAccount.innerHTML = this.access;
    console.log("Indirizzo " + this.access);
  }

  async myGetBalance(){
    //-->Bilancio<--
    this.balance = await this.web3.eth.getBalance(this.access);
    this._balance = this.web3.utils.fromWei(this.balance, "ether");
    //_bal = new BigNumber(this.balance);
    //this.balance = this.balance[0];
    this.showBalance.innerHTML = this._balance;
    console.log("Bilancio " + this._balance);
  }

}
