/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

export class Post{
  constructor(args={}){
    this.id = args.id || '';
    this.content = args.content || '';
    this.time = args.time || '';
    this.isMature = args.isMature || '';
    this.isFlag = args.isFlag || '';
    this.isReport = args.isReport || '';
    this.isHidden = args.isHidden || '';
    this.views = args.views || '';
  }
}