const fs = require("fs-extra");
const crypto = require("crypto");
const config = require("../../config/config");

const algorithm = 'aes-256-cbc';
const secretKey = config.secret_key;
const privKey = config.priv_key;
const loginPubKey = config.login_api_pub_key
const addFinalSlashToPath = (path) => {
    if (!path) {
        return path
    }
    let lastCharacter = path.slice(-1);
    if (lastCharacter !== '/') {
        path = path + "/";
    }
    return path
}
const privateSignEncrypt = async (source) => {

    try {
        let key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);
        let keyBuffer = Buffer.from(key, 'utf8');
        //const cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
        const encrypted = cipher.update(JSON.stringify(source));
        const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
        const data = iv.toString('hex') + ':' + finalBuffer.toString('hex')
        // Sign the data and returned signature in buffer 
        const sign = crypto.sign("SHA256", Buffer.from(data), privKey);
        // Convert returned buffer to base64
        const signature = sign.toString('hex');
        console.log(JSON.stringify({data, signature, key, keyBuffer}))
        return {data, signature}
    } catch (e) {
        console.error(e);
        return null;
    }
}

const publicSignDecrypt = async (source) => {

    const {data, signature} = source;
    try {
        //  if (!crypto.verify("SHA256", data, apiPubkey, Buffer.from(signature, "hex"))){
        if (!crypto.verify("SHA256", Buffer.from(data), loginPubKey, Buffer.from(signature, "hex"))) {
            console.error("Key verification failure");
            return null;
        }
        let key = crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);
        let keyBuffer = Buffer.from(key, 'utf8');
        const encryptedArray = data.split(':');
        const iv = new Buffer(encryptedArray[0], 'hex');
        const encrypted = new Buffer(encryptedArray[1], 'hex');
        const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
        const decrypted = decipher.update(encrypted);
        return Buffer.concat([decrypted, decipher.final()]).toString();
    } catch
        (e) {
        console.error(e);
        return null;
    }
}
const moveFile = async (source, destination) => {
    try {
        const sourceExist = await fs.exists(source);
        if (sourceExist) {
            fs.copySync(source, destination)
            await fs.remove(source)
            console.log('success!')
        }
    } catch (err) {
        console.error(err)
    }
}

const deleteFile = async (path) => {
    try {
        const sourceExist = await fs.exists(path);
        if (sourceExist) {
            await fs.remove(path)
        }
    } catch (err) {
        console.error(err)
    }
}

function differenceBetweenDates(dt2, dt1, unit = 'days') {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;

    if (unit === 'days') {
        diff /= (60 * 60 * 24);
    } else if (unit === 'hours') {
        diff /= (60 * 60);
    } else if (unit === 'minutes') {
        diff /= (60);
    }

    return Math.abs(Math.round(diff));
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

module.exports = {
    addFinalSlashToPath,
    moveFile,
    deleteFile,
    differenceBetweenDates,
    isValidDate,
    privateSignEncrypt,
    publicSignDecrypt
}
