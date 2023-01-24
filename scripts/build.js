/**
 * Contains logic to rename "*.debug.mc" to "*.debug.mc-" in the release build process, and "*.release.mc" to "*.release.mc-" in the debug build process
 * to prevent that these files are included into each other's bundle.
 *
 * Beside that, it always searches for the latest Connect IQ SDK.
 */

const childProcess = require('node:child_process');
const fs = require('fs');
const path = require('path');

const { getFilesRecursive } = require('./helper/get-files-recursive.js');
const { getCurrentSDKPath } = require('./helper/get-current-sdk-path.js');

if (!['--debug', '--release'].includes(process.argv[2])) {
	console.log('Please specify either --debug or --release');

	process.exit(1);
}

const isRelease = (process.argv[2] === '--release');

const filesToRename = getFilesRecursive(process.cwd(), (isRelease ? /\.debug\.mc$/u : /\.release\.mc$/u));

for (const filePath of filesToRename) {
	fs.renameSync(filePath, `${filePath}-`);
}

const child = childProcess.spawn('java', [
	'-Xms1g',
	'-Dfile.encoding=UTF-8',
	'-Dapple.awt.UIElement=true',
	'-jar', path.join(getCurrentSDKPath(), 'bin/monkeybrains.jar'),
	'--output', path.join(process.cwd(), 'build', path.basename(path.resolve(process.cwd()))),
	'--jungles', path.join(process.cwd(), 'monkey.jungle'),
	'--private-key', path.join(process.cwd(), 'developer_key'),
	'--package-app',
	...(isRelease ? ['--release'] : ['--debug', '--profile']),
	'--typecheck', '3',
	'--warn'
]);

child.stdout.on('data', (data) => {
	if (data.toString().startsWith('usage:')) {
		return;
	}

	process.stdout.write(data.toString());
});

child.stderr.on('data', (data) => {
	const lines = data.toString().split(/\r\n|\n|\r/);
	const lastLine = lines.length - 1;

	for (let i = 0; i <= lastLine; i++) {
		const line = lines[i];

		if (line !== '') {
			if (line.startsWith('WARNING:')) {
				process.stdout.write(`\u001B[90m${line}\u001B[39m`);
			}
			else {
				process.stdout.write(`\u001B[31m${line}\u001B[39m`);
			}
		}

		if (i < lastLine) {
			process.stdout.write('\n');
		}
	}
});

child.on('exit', (code) => {
	for (const filePath of filesToRename) {
		fs.renameSync(`${filePath}-`, filePath);
	}

	if (code === 0) {
		process.stdout.write(`\n\u001B[32mEverything is fine!\u001B[39m\n\n`);
	}
	else {
		process.stdout.write(`\n\u001B[31mERROR!!!\u001B[39m\n\n`);
	}

	process.exit(code);
});
