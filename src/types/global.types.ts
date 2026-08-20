// Convierte todos los campos de una intarface a 'string'. Muy utilizado para req.query
export type RequestQuery<T> = {
    [K in keyof T]?: string;
};
