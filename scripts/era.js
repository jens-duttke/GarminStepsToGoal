/**
 * Contains logic to rename "*.debug.mc" to "*.debug.mc-" in the release build process, and "*.release.mc" to "*.release.mc-" in the debug build process
 * to prevent that these files are included into each other's bundle.
 *
 * Beside that, it always searches for the latest Connect IQ SDK.
 */

const childProcess = require('node:child_process');
const fs = require('fs');
const path = require('path');

const { getLatestSDKPath } = require('./helper/get-current-sdk-path.js');

const appId = process.argv[2];

if (!appId) {
	console.log('Please specify a app id');

	process.exit(1);
}

const child = childProcess.spawn(path.join(getLatestSDKPath(), 'bin/era.bat'), [
	'-a', appId,
	'-k', path.join(process.cwd(), 'developer_key')
]);

child.stdout.on('data', (data) => {
	process.stdout.write(data.toString());
});

child.stderr.on('data', (data) => {
	process.stdout.write(`\u001B[31m${data.toString()}\u001B[39m`);
});

child.on('exit', (code) => {
	process.exit(code);
});
