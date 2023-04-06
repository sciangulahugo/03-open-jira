// Informacion que quiero insertar de forma automatica.
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Esto es una description',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'En-Progreso: Esto es otra description',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        {
            description: 'Finalizado: Esto es la mejor description',
            status: 'finished',
            createdAt: Date.now() - 100000,
        }
    ]
}