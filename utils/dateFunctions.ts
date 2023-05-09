import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const getFormatDistanceToNow = (data: number) => {
    const fromNow = formatDistanceToNow(data, { locale: es });

    return `hace ${fromNow}`;
}