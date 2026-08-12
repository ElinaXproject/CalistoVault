const crypto = require('crypto');
const argon2 = require('argon2');

module.exports = {
    async deriveKey(password) {
        return await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 19456,
            timeCost: 2,
            parallelism: 1
        });
    },

    encrypt(data, key) {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', key.slice(0, 32), iv);

        const encrypted = Buffer.concat([
            cipher.update(data, 'utf8'),
            cipher.final()
        ]);

        const tag = cipher.getAuthTag();

        return {
            iv: iv.toString('hex'),
            tag: tag.toString('hex'),
            data: encrypted.toString('hex')
        };
    },

    decrypt(payload, key) {
        const iv = Buffer.from(payload.iv, 'hex');
        const tag = Buffer.from(payload.tag, 'hex');
        const encryptedData = Buffer.from(payload.data, 'hex');

        const decipher = crypto.createDecipheriv('aes-256-gcm', key.slice(0, 32), iv);
        decipher.setAuthTag(tag);

        const decrypted = Buffer.concat([
            decipher.update(encryptedData),
            decipher.final()
        ]);

        return decrypted.toString('utf8');
    }
};
