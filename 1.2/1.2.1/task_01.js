#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
	.option('year', {
		alias: 'y',
		type: 'number',
		description: 'Получить текущий год',
	})
	.option('month', {
		alias: 'm',
		type: 'number',
		description: 'Получить текущий месяц',
	})
	.option('date', {
		alias: 'd',
		type: 'number',
		description: 'Получить текущую дату в календарном месяце',
	}).argv;

let dateNow = new Date();

if (argv._[0] === 'current') {
	if ('year' in argv) {
		console.log('year:', dateNow.getFullYear());
	} else if ('month' in argv) {
		console.log('month:', dateNow.getMonth());
	} else if ('date' in argv) {
		console.log('date:', dateNow.getDate());
	} else {
		console.log(dateNow.toISOString());
	}
} else {
	if (argv.year) {
		if (argv._[0] === 'sub') {
			argv.year *= -1;
		}
		dateNow.setFullYear(dateNow.getFullYear() + argv.year);
	} else if (argv.month) {
		if (argv._[0] === 'sub') {
			argv.month *= -1;
		}
		dateNow.setMonth(dateNow.getMonth() + argv.month);
	} else if (argv.date) {
		if (argv._[0] === 'sub') {
			argv.date *= -1;
		}
		dateNow.setDate(dateNow.getDate() + argv.date);
	}
	console.log(dateNow.toISOString());
}
