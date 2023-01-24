const fs = require('fs');
const path = require('path');

const APP_DATA = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
const SDK_DATE_REGEXP = /(\d\d\d\d)-(\d\d)-(\d\d)-.+$/u;

/**
 * Returns the path to the current Connect IQ SDK version.
 *
 * @public
 * @returns {string}
 * @throws {Error} If no Connect IQ SDK folder has been found.
 */
function getCurrentSDKPath () {
	const connectIQPath = path.join(APP_DATA, 'Garmin/ConnectIQ');
	const sdkConfigFile = path.join(connectIQPath, 'current-sdk.cfg');

	const sdkPath = fs.existsSync(sdkConfigFile) && fs.lstatSync(sdkConfigFile).isFile() && fs.readFileSync(sdkConfigFile, 'utf8').trim();

	if (sdkPath && fs.existsSync(sdkPath) && fs.lstatSync(sdkPath).isDirectory()) {
		return sdkPath;
	}

	const connectIQSdksDirectories = getSubDirectories(path.join(connectIQPath, 'Sdks'));

	if (connectIQSdksDirectories.length === 0) {
		throw new Error(`No Connect IQ SDK found in ${connectIQPath}`);
	}
	else if (connectIQSdksDirectories.length === 1) {
		return connectIQSdksDirectories[0];
	}
	else {
		const getOrderedDirectories = connectIQSdksDirectories.map((name) => {
			const match = SDK_DATE_REGEXP.exec(name);

			if (match === null) {
				return null;
			}

			const version = Number.parseInt(`${match[1]}${match[2]}${match[3]}`);

			if (!Number.isFinite(version)) {
				return null;
			}

			return [version, name]
		}).filter((item) => item !== null).sort((a,b ) => b[0] - a[0]);

		if (connectIQSdksDirectories.length === 0) {
			throw new Error(`No Connect IQ SDK folder found in ${connectIQSdkParentPath}`);
		}

		return connectIQSdksDirectories[0];
	}
}

/**
 * Returns an array of all direct sub-directories within a path.
 *
 * @private
 * @param {string} parentPath
 * @returns {string[]}
 */
function getSubDirectories (parentPath) {
	const result = [];

	if (!fs.existsSync(parentPath)) {
		return;
	}

	const files = fs.readdirSync(parentPath);

	for (const file of files) {
		const filePath = path.join(parentPath, file);

		if (fs.lstatSync(filePath).isDirectory()) {
			result.push(filePath);
		};
	};

	return result;
};

module.exports = {
	getCurrentSDKPath
};
