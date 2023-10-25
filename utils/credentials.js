import * as fs from 'fs';
import path from 'path';

export const credentials = JSON.parse(fs.readFileSync(path.resolve('./credentials.json')))