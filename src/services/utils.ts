import { Response } from "express";

export const badRequest = (res: Response, err: string) => {
    res.status(400).json({
        error: err
    });
}

export const internalServerError = (res: Response, err: Error) => {
    if (process.env.NODE_ENV === "development") {
        res.status(500).json({
            err: err.message,
            stack: err.stack
        });
    } else {
        res.status(500).json({
            err: "Erro interno no servidor"
        });
    }
};

export const notFound = (res: Response, message: string) => {
    return res.status(404).json({ error: message });
};

export const ok = (res: Response, message: string = "Operação bem-sucedida") => { 
    res.status(200).json({ message });
};


export const validateNumber = (num: any): boolean => {

    return !isNaN(num) && Number.isFinite(num) && parseFloat(num) > 0;
}
