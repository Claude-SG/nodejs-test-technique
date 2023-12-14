#!/usr/bin/env node

const args = process.argv
const { data } = require('./data.js');
const { Filter } = require('./components/filter.js');
const { Count } = require('./components/count.js');

/**
 * print the instructions base on the explains of the commands
 * @return the instructions
 */
const help = function() {
	let result = '\nHelp : you need to specify a command for this app. Commands can be :\n\n';
	for (let c in commands) {
	    result += commands[c].explain+'\n';
	}
	return result;
};

/**
 * list of commands available
 */
const commands = {
	'--filter': { command:Filter, useData:true, hasParam:true, explain:'--filter=N : filter a list of elements containing a pattern. Replace N with your filter (ex : ry)' },
	'--count': { command:Count, useData:true, hasParam:false, explain:'--count : counts of People and Animals by counting the number of children and appending it in the name' }
	// declare news commands here
};

/**
 * validate the command of the user. We check the number of args, if the command exist, and her parameter
 * @param {args} list of arguments from the command line
 * @return true if the command is valid, false in others cases
 */
function validateCommand(args) {
	//verify the number of arguments
	if(args.length != 3) {
		console.log(`Error : bad number of arguments`+help());
		return false;
	}
	else {
		const commandValues = args[2].split('=');

		// verify if command exist
		if(commands.hasOwnProperty(commandValues[0])) {
			// verify the parameter
			const { hasParam } = commands[commandValues[0]];
			if(commandValues.length-1 === (hasParam ? 1 : 0)) {
				return true;
			}
			else {
				console.log('Error : bad parameter for this command'+help());
				return false;
			}
		}
		else {
			console.log('Error : unknow command'+help());
			return false;
		}
	}
}

/**
 * execute the command of the user. We check if we need a parameter, and the data. The result is print in the output.
 * @param {colmmandValues} the command of the user, with parameter if exist
 * 
 */
function executeCommand(commandValues) {
	const {command, hasParam, useData } = commands[commandValues[0]];
	
	const commandAexec = new command();
	let result;

	if(useData)
		result = (hasParam) ? commandAexec.exec(data, commandValues[1]) : commandAexec.exec(data);
	else
		result = (hasParam) ? commandAexec.exec(commandValues[1]) : commandAexec.exec();

	const formatter = commandAexec.format(result, 0);
	if(formatter.length > 0)
		console.log(formatter);
}

/**
 * the main execution
 */
if (require.main === module) {
	if(validateCommand(args)) {
		const commandValues = args[2].split('=');
		executeCommand(commandValues);
	}
}

module.exports = { validateCommand };