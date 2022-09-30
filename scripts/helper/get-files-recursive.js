const fs = require('fs');
const path = require('path');

/**
 * Returns a list of files which are matching the filter pattern.
 * The whole path is checked and returned.
 *
 * @public
 * @param {string} parentPath
 * @param {RegExp} filter
 * @returns {string[]}
 */
function getFilesRecursive (parentPath, filter) {
	const result = [];

	if (!fs.existsSync(parentPath)) {
		return;
	}

	const files = fs.readdirSync(parentPath);

	for (const file of files) {
		const filePath = path.join(parentPath, file);

		if (fs.lstatSync(filePath).isDirectory()) {
			result.push(...getFilesRecursive(filePath, filter));
		}
		else if (filter.test(filePath)) {
			result.push(filePath);
		};
	};

	return result;
};

module.exports = {
	getFilesRecursive
};
