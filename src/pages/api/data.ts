// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { JJBAData } from './jjbaData'
import data from './data/all_data.json'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<JJBAData>
) {
    res.status(200).json(data)
}
 