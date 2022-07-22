import { AfterViewInit, Component } from '@angular/core';
import { interval } from 'rxjs';
import Web3 from 'web3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit {
  title = 'metamask-balance-app';
  private web3: Web3 = new Web3(Web3.givenProvider);

  constructor() {}

  access: any;
  ethereumButton: any;
  balanceButton: any;
  balance: any;
  //_balance : any; Variabile usata per (eventualmente) salvare il bilancio in decimali
  showAccount: any;
  showBalance: any;
  connected: boolean = true;

  ngOnInit() {
    this.checkConnection();
    //verifico periodicamente se sono già collegato
    interval(2000).subscribe((val) => { this.checkConnection(); });
  }

  ngAfterViewInit(): void {
    //Binding bottoni
    this.showBalance = document.querySelector('.showBalance');
    this.ethereumButton = document.querySelector('.enableEthereumButton');

    //Binding span
    this.showAccount = document.querySelector('.showAccount');
    this.balanceButton = document.querySelector('.showMyBalance');
    //event listener per i click sui bottoni
    this.ethereumButton.addEventListener('click', () => {
      this.getAccount();
    });
    this.balanceButton.addEventListener('click', () => {
      this.myGetBalance();
    });
  }

  async getAccount() {
    //-->Indirizzo<--
    //Il metodo commentato segue il codice della libreria di MetaMask
    /* this.metaAccess= window;
    this.access = await this.metaAccess.ethereum.request({method: 'eth_requestAccounts'}); */
    //Il codice qui sotto esegue l'accesso seguendo la libreria web3.js
    this.access = await this.web3.eth.requestAccounts();
    this.connected = false;
    this.access = this.access[0];
    this.showAccount.innerHTML = this.access;
    console.log('Indirizzo ' + this.access);
  }

  async myGetBalance() {
    //-->Bilancio<--
    this.balance = await this.web3.eth.getBalance(this.access);
    //Conversione non indispensabile
    //this._balance = this.web3.utils.fromWei(this.balance, "ether");
    this.showBalance.innerHTML = this.web3.utils.fromWei(this.balance, 'ether') + " ETH";
    console.log('Bilancio ' + this.web3.utils.fromWei(this.balance, 'ether'));
  }

  checkConnection() {
    const handleAccountsChanged = this.handleAccountsChanged.bind(this) as () => void;
    this.web3.eth.getAccounts().then(handleAccountsChanged);
  }

  async handleAccountsChanged(accounts) {
    let currentAccount = null;
    //console.log(accounts);

    //se non sono collegato, mostro il pulsante di login
    if (accounts.length === 0) {
      //console.log("Non sei connesso");
      this.connected = true;
      this.showBalance.innerHTML = "";
    }
    //altrimenti carico l'indirizzo
    else {
      currentAccount = accounts[0];
      //console.log("Sei connesso");
      this.connected = false;
      //console.log(this.connected);
      this.access = await this.web3.eth.requestAccounts();
      this.access = this.access[0];
      this.showAccount.innerHTML = this.access;
    }
  }

}
