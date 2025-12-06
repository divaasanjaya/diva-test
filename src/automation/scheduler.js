const cron = require("node-cron");
const { Parser } = require("json2csv");
const path = require("path");
const fs = require("fs");

exports.collectScheduler = cron.schedule("0 8,12,15 * * *", async () => {
    console.log("Start fetching data...");

    const now = new Date();
    const date = String(now.getFullYear()) + String(now.getMonth()+1).padStart(2, "0") + String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0") + "." + String(now.getMinutes()).padStart(2, "0");

    try {
        const res = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-6.2146&lon=106.8451&appid=36a9b4d90a3d82e1f56b1c5ae073f694");
        const jsonData = await res.json();

        const parser = new Parser();
        const csvData = parser.parse(jsonData);

        const folderPath = path.join(__dirname, "../../home/cron");
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        const filePath = path.join(folderPath, `cron_${date}_${hours}.csv`)

        fs.writeFileSync(filePath, csvData);

        console.log("Finished fetching data...");
    } catch (err) {
        console.log(err);
    }
}, {
    timezone: "Asia/Jakarta"
});

exports.deleteScheduler = cron.schedule("0 0 * * *", async () => {
    console.log("Start cleaning data...");

    const folderPath = path.join(__dirname, "../../home/cron");
    if (!fs.existsSync(folderPath)) {
        console.log("Folder not found");
        return;
    }

    const files = fs.readdirSync(folderPath);

    const now = Date.now();
    const oneMonth = 30*24*60*60*1000;

    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);

        const fileAge = now - stats.birthtimeMs;
        if (fileAge > oneMonth) {
            fs.unlinkSync(filePath);
            console.log(`Deleted file ${file}`);
        }
    });

    console.log("Finished cleaning data...")
}, {
    timezone: "Asia/Jakarta"
});

