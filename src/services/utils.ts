import { Response } from "express";

export const badRequest = (res: Response, err: string) => {
    res.status(400).json({
        error: err
    });
}

export const internalServerError = (res: Response, err: Error) =>
    res.status(500).json({
        err: err.message
    })

export const notFound = (res: Response, message: string) => {
    return res.status(404).json({ error: message });
};

export const ok = (res: Response) => { res.status(200);
};

export const validateNumber = (num: any): boolean => {

    return !isNaN(num) && Number.isFinite(num) && parseFloat(num) > 0;
}