class TestObj {
    constructor(str) {
        this.a = str;
    }
}
export default function obj(str) {
    return new TestObj(str);
}