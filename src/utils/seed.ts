import fs from "fs";

const jsonBlob = fs.readFileSync("./src/pages/api/data/all_data.json", "utf-8");

const jsonObj = JSON.parse(jsonBlob);

const load = async () => {
    try {
        console.log('try')
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await console.log('finally')
    }
}

load()