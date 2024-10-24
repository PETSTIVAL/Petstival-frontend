import { sum, obj } from './toHaveBeenCalled'
import { jest } from '@jest/globals'; // 추가된 부분

test('sum 함수가 호출되었다.', () => {
    const sumSpy = jest.fn(sum)
    sumSpy(1, 2) 
    expect(sumSpy).toHaveBeenCalled()
})

test('sum 함수가 1번 호출되었다.', () => {
    const sumSpy = jest.fn(sum)
    sumSpy(1, 2) 
    expect(sumSpy).toHaveBeenCalledTimes(1)
})

test('sum 함수가 1,2와 함께 호출되었다.', () => {
    const sumSpy = jest.fn(sum)
    sumSpy(1, 2) 
    expect(sumSpy).toHaveBeenCalledWith(1,2)
})

test('obj.minus 함수가 1번 호출되었다.(spy 함수 생성)', () => {
    const minusSpy = jest.fn(obj.minus)
    minusSpy(1, 2) 
    expect(minusSpy).toHaveBeenCalledTimes(1)
})

test('obj.minus 함수가 1번 호출되었다.(spy 함수 삽입)', () => {
    jest.spyOn(obj, 'minus')
    const result = obj.minus(1, 2) 
    expect(obj.minus).toHaveBeenCalledTimes(1)
    expect(result).toBe(-1)
})