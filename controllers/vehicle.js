const crypto = require("crypto");

exports.postEncrypt = async (req, res, next) => {
  try {
    const key = process.env.ENCRYPTION_KEY;
    const iv = crypto.randomBytes(16);
    const data = req.body.data;
    //Encrypting text
    function encrypt(data) {
      let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
      let encrypted = cipher.update(data);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return {
        iv: iv.toString("hex"),
        encryptedData: encrypted.toString("hex"),
      };
    }

    // Text send to encrypt function
    var encryptData = encrypt(data);
    res.status(201).send(encryptData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.postDecrypt = (req, res, next) => {
  try {
    const key = process.env.ENCRYPTION_KEY;
    // console.log(key);

    let iv = Buffer.from(req.body.iv, "hex");
    // console.log(iv);

    const encryptedData = req.body.encryptedData;
    // console.log(encryptedData);

    let encryptedText = Buffer.from(encryptedData, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const decryptedData = decrypted.toString();

    res.status(201).send(decryptedData);
  } catch (error) {
    res.status(500).json(error);
  }
};
