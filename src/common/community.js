/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

export class Community{
  constructor(args={}){
    this.id = args.id || '';
    this.name = args.name || '';
    this.alias = args.alias || '';
    this.sea = args.sea || '';
    this.passphrase = args.passphrase || '';
    this.date = args.date || '';
    this.key = args.key || '';
    this.token = args.token || '';
  }
}