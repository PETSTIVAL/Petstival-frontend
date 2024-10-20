import { error, customError } from "./throwFunction";

test("error가 잘 난다", () => {
    expect(() => error().toThrow(Error))
    expect(() => customError().toThrow(customError))
})

test("error가 잘 난다 (try/catch문 버전)", () => {
    try {
        error()
    } catch (err) {
        expect(err).toStrictEqual(new Error())
    }
})