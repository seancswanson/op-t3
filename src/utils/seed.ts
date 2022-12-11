import fs from "fs";
import { FormattedStand, Stand } from "../pages/api/jjbaData";
import { prisma } from "../utils/prisma";

const load = async () => {
    try {
        const jsonBlob = fs.readFileSync("./src/pages/api/data/all_data.json", "utf-8");
        const jsonObj = JSON.parse(jsonBlob);
        const formattedStandData: FormattedStand = jsonObj.data.map((stand: Stand) => {
            return {
                id: stand.id,
                name: stand.stand,
                name_jp: stand.stand_ja,
                reference_url: stand.reference_url,
                season: stand.season,
                type_0: stand.type[0],
                type_1: stand.type[1],
                type_2: stand.type[2],
                type_3: stand.type[3],
                stand_image_0: stand.stand_images[0],
                stand_image_1: stand.stand_images[1],
                stand_image_2: stand.stand_images[2],
                stand_image_3: stand.stand_images[3],
                user: stand.user,
                gender: stand.gender,
                hair_color: stand.hair_color,
                eye_color: stand.eye_color,
                user_image_0: stand.user_images[0],
                user_image_1: stand.user_images[1],
                user_image_2: stand.user_images[2],
                user_image_3: stand.user_images[3]
            };
        })
        const fillDbWithStands = await prisma.stand.createMany({
            data: formattedStandData
        })
        console.log(formattedStandData)
        console.log('try')
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await console.log('finally')
    }
}

load()