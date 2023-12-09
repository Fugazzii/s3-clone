import fs from "fs";

export const readDir = (
	dirPath: string
): Promise<Array<string>> =>
	new Promise((resolve, reject) => {
		fs.readdir(
			dirPath,
			(err, files) => err ? reject(err) : resolve(files)
		);
	});