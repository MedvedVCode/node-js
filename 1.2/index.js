const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
.option('param1',{
	alias: 'p1',
	type:'boolean',
	description: 'param1 aka p1 as boolean'
})
.option('param2',{
	type:'string',
	description: 'param2 aka p2 as string',
	default: 'default param2'
})
.argv;

console.log('argv', argv);
console.log(argv._[0]);

