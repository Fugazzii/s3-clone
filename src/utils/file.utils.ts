import fs from "fs";

const readDir = (dirPath: string): Promise<Array<string>> =>
	new Promise((resolve, reject) => {
		fs.readdir(dirPath, (err, files) => {
			if (err) {
				reject(err);
			} else {
				resolve(files);
			}
		});
	});

const statFile = (filePath: string): Promise<fs.Stats> =>
	new Promise((resolve, reject) => {
		fs.stat(filePath, (err, stats) => {
			if (err) {
				reject(err);
			} else {
				resolve(stats);
			}
		});
	});