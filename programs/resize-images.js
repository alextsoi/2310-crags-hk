// Scan all the images under a folder and its subfolders
// Check the image in output folder existence
// If not exists, resize

const inputFolder = 'public/images';
const outputFolder = 'public/images-resized';

// preseve the apsect ratio
const width = 960;

const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        try {
            filelist = walkSync(dirFile, filelist);
        } catch (err) {
            if (err.code === 'ENOTDIR' || err.code === 'EBUSY') filelist = [...filelist, dirFile];
            else throw err;
        }
    });
    return filelist;
}

const files = walkSync(inputFolder);

files.forEach((file) => {
    const fileOutput = file.replace(inputFolder, outputFolder);
    if (!fs.existsSync(fileOutput)) {
        // Check the folder of file existence
        const folder = path.dirname(fileOutput);
        // if not exists, create it
        fs.mkdirSync(folder, { recursive: true });
        sharp(file)
            .resize(width)
            .toFile(fileOutput)
            .then(function (newFileInfo) {
                console.log("Success", newFileInfo);
            })
            .catch(function (err) {
                console.log("Error occured", err);
            });
    } else {
        console.log(`File exists: ${fileOutput}`);
    }
});
