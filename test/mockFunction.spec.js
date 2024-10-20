import { obj } from './mockFunctions'
import { jest } from '@jest/globals'; // 추가된 부분

test('obj.minus 함수가 1번 호출되었다.(spy 함수 삽입)', () => {
    const spyFn = jest.spyOn(obj, 'minus')
    const result = obj.minus(1, 2) 
    expect(obj.minus).toHaveBeenCalledTimes(1)
    expect(result).toBe(-1)
    spyFn.mockClear()
})

test('obj.minus에 스파이를 심고 실행도 안되게', () => {
    const spyFn = jest.spyOn(obj, 'minus').mockImplementation(() => {})
    const result = obj.minus(1, 2) 
    expect(obj.minus).toHaveBeenCalledTimes(1)
    expect(result).toBe(undefined)
    spyFn.mockClear()
})

test('obj.minus에 스파이를 심고 리턴값을 바꾸게 (mockImplementation)', () => {
    const spyFn = jest.spyOn(obj, 'minus').mockImplementation(() => 5)
    const result = obj.minus(1, 2) // obj.minus 함수는 mockImplementation(() => 5)이 된다.
    expect(obj.minus).toHaveBeenCalledTimes(1)
    expect(result).toBe(5)
    spyFn.mockClear()
})

test('obj.minus에 스파이를 심고 리턴값을 바꾸게 (mockReturnValue)', () => {
    const spyFn = jest.spyOn(obj, 'minus').mockReturnValue(5)
    const result = obj.minus(1, 2) // obj.minus 함수의 리턴값은 mockReturnValue(5)가 된다.
    expect(obj.minus).toHaveBeenCalledTimes(1)
    expect(result).toBe(5)
    spyFn.mockClear()
})