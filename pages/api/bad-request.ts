import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string | string[],
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { message = 'Algo salio mal' } = req.query;
    // console.log(process.env)
    res.status(400).json({ message })
}
