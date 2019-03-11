import moment from "moment";
import mDump from "./mDump";
import {existsSync,mkdirSync, createWriteStream} from 'fs';

export default class Mlog{

    static log(message){
        const date = moment().format("YYYYMMDD");
        const dirName = "./logs";
        const fileName = `${dirName}/${date}.morn.log`

       if (!existsSync(dirName))
           mkdirSync(dirName)

       if (!this.fileStream || this.fileStream.path != fileName)
           this.fileStream = createWriteStream(fileName, { flags: "a" })

       const msgDisplayed = mDump(message) + "\n";

       this.fileStream.write(msgDisplayed);
    }
}