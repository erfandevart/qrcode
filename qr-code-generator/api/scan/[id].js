const userCodes = {}; // در حالت واقعی از پایگاه داده استفاده کنید

module.exports = async (req, res) => {
    const { id } = req.query;

    // بررسی وجود کد
    if (!userCodes[id]) {
        return res.status(404).json({ message: 'کد مورد نظر یافت نشد.' });
    }

    // بررسی اینکه آیا قبلاً اسکن شده است یا خیر
    if (userCodes[id].scanned) {
        return res.status(200).json({ message: 'این کد قبلاً اسکن شده است.' });
    }

    // تنظیم وضعیت اسکن به true
    userCodes[id].scanned = true;

    // نمایش پیام موفقیت‌آمیز
    res.status(200).json({ message: `کد شما با موفقیت اسکن شد! کد منحصر به فرد شما: ${id}` });
};