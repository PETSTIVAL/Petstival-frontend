import obj from './toStrictEqual'

test('객체는 toStrictEqual를 사용해야 한다.', () => {
    expect(obj()).toStrictEqual({ a: 'hello'})
    expect(obj()).not.toBe({ a: 'hello'})
})

test('배열끼리도 toStrictEqual를 사용해야 한다.', () => {
    expect([1,2,3]).toStrictEqual([1,2,3])
    expect([1,2,3]).not.toBe([1,2,3])
})