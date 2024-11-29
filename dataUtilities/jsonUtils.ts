import jsonfile from 'jsonfile';

export const readJsonfile = (filePath: string):Promise<any> => {
    return jsonfile.readFile(filePath);
}
