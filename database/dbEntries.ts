import { isValidObjectId } from "mongoose"
import { db } from ".";
import { Entry, IEntry } from "@/models";

export const getEntryById = async (id: string): Promise<IEntry | null> => {
    if (!isValidObjectId(id)) return null;
    await db.connect();
    const entry = await Entry.findById(id).lean();
    // Nota, el lean se utiliza para traer la informacion justa y necesaria.
    await db.disconnect();

    // Tenemos que serializar la data.
    return JSON.parse(JSON.stringify(entry));
}