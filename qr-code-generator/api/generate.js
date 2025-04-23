const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

// ذخیره‌سازی موقت کدها (در حالت واقعی از پایگاه داده استفاده کنید)
const userCodes = {};

module.exports = async (req, res) => {
    const uniqueId = uuidv4(); // تولید کد منحصر به فرد
    const qrData = `https://your-vercel-url.vercel.app/api/scan/${uniqueId}`; // داده‌ای که داخل QR کد قرار می‌گیرد

    // تولید QR کد
    try {
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        // ذخیره کد در حافظه
        userCodes[uniqueId] = { scanned: false };

        // ارسال پاسخ به کاربر
        res.status(200).json({ qrCodeUrl });
    } catch (err) {
        res.status(500).json({ error: 'خطا در تولید QR کد' });
    }
};