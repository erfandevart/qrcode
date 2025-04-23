const express = require('express');
const { v4: uuidv4 } = require('uuid');
const QRCode = require('qrcode');

const app = express();
const PORT = 3000;

// ذخیره‌سازی موقت کدها (در حالت واقعی از پایگاه داده استفاده کنید)
const userCodes = {};

// صفحه اصلی - نمایش QR کد
app.get('/', (req, res) => {
    const uniqueId = uuidv4(); // تولید کد منحصر به فرد
    const qrData = `http://localhost:${PORT}/scan/${uniqueId}`; // داده‌ای که داخل QR کد قرار می‌گیرد

    // تولید QR کد
    QRCode.toDataURL(qrData, (err, url) => {
        if (err) {
            return res.status(500).send('خطا در تولید QR کد');
        }

        // ذخیره کد در حافظه (یا پایگاه داده)
        userCodes[uniqueId] = { scanned: false };

        // نمایش QR کد در مرورگر
        res.send(`
            <h1>اسکن کد QR خود را انجام دهید</h1>
            <img src="${url}" alt="QR Code">
        `);
    });
});

// مسیر برای اسکن کد
app.get('/scan/:id', (req, res) => {
    const userId = req.params.id;

    // بررسی وجود کد
    if (!userCodes[userId]) {
        return res.status(404).send('کد مورد نظر یافت نشد.');
    }

    // بررسی اینکه آیا قبلاً اسکن شده است یا خیر
    if (userCodes[userId].scanned) {
        return res.send('این کد قبلاً اسکن شده است.');
    }

    // تنظیم وضعیت اسکن به true
    userCodes[userId].scanned = true;

    // نمایش پیام موفقیت‌آمیز
    res.send(`کد شما با موفقیت اسکن شد! کد منحصر به فرد شما: ${userId}`);
});

// راه‌اندازی سرور
app.listen(PORT, () => {
    console.log(`سرور در حال اجرا بر روی http://localhost:${PORT}`);
});