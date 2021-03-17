/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

export class Account{
  constructor(args={}){
    this.id = args.id || '';
    this.alias = args.alias || '';
    this.sea = args.sea || '';
    this.passphrase = args.passphrase || '';
    this.question1 = args.question1 || '';
    this.question2 = args.question2 || '';
    this.hint = args.hint || '';
    this.date = args.date || '';
    this.email = args.email || '';
    this.role = args.role || '';
    this.key = args.key || '';
    this.token = args.token || '';
    this.isban = args.isban || '';
  }
}