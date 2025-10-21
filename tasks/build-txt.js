/**
 * @file Output the version number to a build.txt file.
 *
 * This is needed for Bamboo variable injection.
 */
import {
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync,
} from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

const PATH = '../';
const FILENAME = 'build.txt';

const readVersion = () => {
    const rawPackageData = readFileSync(resolve(__dirname, '../package.json'), 'utf8');
    const packageData = JSON.parse(rawPackageData);

    return packageData.version;
};

const main = () => {
    const content = `version=${readVersion()}`;
    const dir = resolve(__dirname, PATH);

    if (!existsSync(dir)) {
        mkdirSync(dir);
    }

    const filePath = resolve(__dirname, PATH, FILENAME);
    writeFileSync(filePath, content);

    // eslint-disable-next-line no-console
    console.log(`Version number written to ${filePath}`);
};

main();
