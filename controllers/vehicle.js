const crypto = require("crypto");

exports.postData = async (req, res, next) => {
  try {
    const data = req.body.data;

    const algorithm = "aes-256-cbc";

    // generate 16 bytes of random data
    const initVector = crypto.randomBytes(16);

    // protected data
    const message = data;

    // secret key generate 32 bytes of random data
    const Securitykey = crypto.randomBytes(32);

    const Stringkey = Securitykey.toString("hex"); // 'Hello, World'
    console.log(Stringkey);

    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(message, "utf-8", "hex");

    encryptedData += cipher.final("hex");

    console.log("Encrypted message: " + encryptedData);
    const EncryptedData = "Encrypted message: " + encryptedData;

    // the decipher function
    const decipher = crypto.createDecipheriv(
      algorithm,
      Securitykey,
      initVector
    );

    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

    decryptedData += decipher.final("utf8");

    console.log("Decrypted message: " + decryptedData);

    const DecryptedData = "  Decrypted message: " + decryptedData;
    res.status(201).json(EncryptedData + DecryptedData);
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.postData = async (req, res, next) => {
//   console.log(req.body.data);
//   var algorithm = "aes-192-cbc"; //algorithm to use
//   var password = "secretkey";
//   const key = crypto.scryptSync(password, "salt", 24); //create key
//   var text = req.body.data; //text to be encrypted

//   const iv = crypto.randomBytes(16); //generate different ciphertext everytime
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex"); // encrypted text

//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
//   var decrypted =
//     decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8"); //deciphered text
//   console.log(decrypted);
// };
