export function error() {
    throw new Error();
}

export class CustomError extends Error {}
export function customError() {
    throw new CustomError();
}