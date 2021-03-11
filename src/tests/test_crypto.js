/**
  Project Name: cip2psn

  LICENSE: MIT

  Created By: Lightnet

 */

// https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/
// https://www.sohamkamani.com/nodejs/rsa-encryption/

var crypto = require('crypto');
//var assert = require('assert');

const assert = require('assert').strict;

/*
//var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
//var algorithm = 'aes-192-ccm';
//var algorithm = 'aes-128-cbc';
var algorithm = 'aes-256-ctr';
var key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
//var key = `12345678901234567890123456789012`
//var key = 'secretkey'; //not working require more length
var text = 'I love kittens';
const iv = crypto.randomBytes(16);

var cipher = crypto.createCipheriv(algorithm, key, iv);  
var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
console.log(encrypted);

var decipher = crypto.createCipheriv(algorithm, key, iv);
var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
console.log(decrypted);

assert.strictEqual(decrypted, text);
*/

/*
// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	// The standard secure default length for RSA keys is 2048 bits
	modulusLength: 2048,
})

// This is the data we want to encrypt
const data = "my secret data"

const encryptedData = crypto.publicEncrypt(
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	// We convert the data string to a buffer using `Buffer.from`
	Buffer.from(data)
)

// The encrypted data is in the form of bytes, so we print it in base64 format
// so that it's displayed in a more readable form
console.log("encypted data: ", encryptedData.toString("base64"))

const decryptedData = crypto.privateDecrypt(
	{
		key: privateKey,
		// In order to decrypt the data, we need to specify the
		// same hashing function and padding scheme that we used to
		// encrypt the data in the previous step
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	encryptedData
)

// The decrypted data is of the Buffer type, which we can convert to a
// string to reveal the original data
console.log("decrypted data: ", decryptedData.toString())


// Create some sample data that we want to sign
const verifiableData = "this need to be verified"

// The signature method takes the data we want to sign, the
// hashing algorithm, and the padding scheme, and generates
// a signature in the form of bytes
const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
	key: privateKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
})

console.log(signature.toString("base64"))

// To verify the data, we provide the same hashing algorithm and
// padding scheme we provided to generate the signature, along
// with the signature itself, the data that we want to
// verify against the signature, and the public key
const isVerified = crypto.verify(
	"sha256",
	Buffer.from(verifiableData),
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	},
	signature
)

// isVerified should be `true` if the signature is valid
console.log("signature verified: ", isVerified)
*/