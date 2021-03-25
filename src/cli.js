/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

*/

// https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts
import arg from 'arg';
import inquirer from 'inquirer';
//console.log("init...");
function parseArgumentsIntoOptions(rawArgs) {
  //if(!rawArgs){
    //rawArgs=[];
  //}
  //console.log(rawArgs);
  const args = arg(
    {
      '--db':String,
      '--user':String,
      '--pass':String,
      '--role':String,
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      //'-g': '--git',
      '-y': '--yes',
      '-i': '--install',
      //'-db':'--database',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    //git: args['--git'] || false,
    //pouchdb: args['--database'] || 'pouchdb',
    //user: args['--user'] || 'admin',
    //pass: args['--pass'] || 'passwordroot',
    pouchdb: args['--db'],
    user: args['--user'],
    pass: args['--pass'],
    role: args['--role'] || 'admin',
    runInstall: args['--install'] || false,
  };
}

async function promptForMissingOptions(options) {

  const defaultPouchDB = 'pouchdb';
  const defaultUser = 'adminuser';
  const defaultPass = 'adminpass';
  const defaultRole = 'admin';

  if (options.skipPrompts) {
    return {
      ...options,
      pouchdb: options.pouchdb || defaultPouchDB,
      user: options.user || defaultUser,
      pass: options.pass || defaultPass,
      role: options.role || defaultRole,
    };
  }

  const questions = [];
  if (!options.pouchdb) {
    questions.push({
      type: 'input',
      name: 'pouchdb',
      message: 'Please name your database:',
      default: defaultPouchDB,
    });
  }

  if (!options.user) {
    questions.push({
      type: 'input',
      name: 'user',
      message: 'Create user name:',
      default: defaultUser,
    });
  }

  if (!options.pass) {
    questions.push({
      type: 'input',
      name: 'pass',
      message: 'Create user pass:',
      default: defaultPass,
    });
  }

  if (!options.role) {
    questions.push({
      type: 'list',
      name: 'role',
      message: 'Select Role:',
      choices: ['user', 'mod','admin'],
      default: defaultRole,
    });
  }

  //if (!options.git) {
    //questions.push({
      //type: 'confirm',
      //name: 'git',
      //message: 'Should a git be initialized?',
      //default: false,
    //});
  //}

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    //git: options.git || answers.git,
    pouchdb: options.pouchdb || answers.pouchdb,
    user: options.user || answers.user,
    pass: options.pass || answers.pass,
    role: options.role || answers.role,
  };
}

export async function cli(args) {
  //console.log("INIT...");
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  console.log(options);
  //await createProject(options);
}

//cli(process.env);
//console.log(process.env);