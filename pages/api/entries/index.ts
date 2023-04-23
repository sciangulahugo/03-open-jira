import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers';

type Data =
    | { message: string }
    | IEntry[]
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntries(res);
        case 'POST':
            return postEntry(req, res);
        default:
            return res.status(400).json({ message: 'Endpoint not found' });
    }

}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();
    // Mandamos los datos.
    res.status(200).json(entries);
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description = '' } = req.body;

    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    })

    try {
        await db.connect();
        // Guardamos en la base de datos.
        await newEntry.save();
        await db.disconnect();

        // Permitir la respuesta de IEntry en Data (Al inicio).
        return res.status(201).json(newEntry);
    } catch (error) {
        await db.disconnect();
        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor.' });
    }
}