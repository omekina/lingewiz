import Reference from "../Reference";
import Result from "../Result";
import Matrix from "./Matrix";


function match_size(a: Reference<Matrix.Matrix>, b: Reference<Matrix.Matrix>): boolean {
    if (a.value.size.length != b.value.size.length) {
        return false;
    }
    for (let i = 0; i < a.value.size.length; ++i) {
        if (a.value.size[i] != b.value.size[i]) { return false; }
    }
    return true;
}

export type MatrixElementWiseOperation = (
    a: Reference<Matrix.Matrix> | number, b: Reference<Matrix.Matrix> | number
    ) => Result<Matrix.Matrix>;


export function element_math_operation(
    a: Reference<Matrix.Matrix> | number,
    b: Reference<Matrix.Matrix> | number,
    operation: (a: number, b: number) => number
    ): Result<Matrix.Matrix> {
    if (typeof a == "number" && typeof b == "number") {
        return { value: {
            data: [operation(a, b)],
            size: [1],
        }};
    }
    if (typeof a == "number") {
        const temp: number = a;
        a = <Reference<Matrix.Matrix>> b;
        b = temp;
    }
    if (typeof b == "number") {
        let data: number[] = [];
        for (let i = 0; i < a.value.data.length; ++i) {
            data.push(operation(a.value.data[i], b));
        }
        return { value: {
            data: data,
            size: a.value.size,
        }};
    }
    if (!match_size(a, b)) { return {}; }
    let data: number[] = [];
    for (let i = 0; i < a.value.data.length; ++i) {
        data.push(operation(a.value.data[i], b.value.data[i]));
    }
    return { value: {
        data: data,
        size: a.value.size,
    }};
}


export function multiply(a: Reference<Matrix.Matrix> | number, b: Reference<Matrix.Matrix> | number): Result<Matrix.Matrix> {
    if (typeof a == "number" && typeof b == "number") {
        return { value: {
            data: [a * b],
            size: [1],
        }};
    }
    if (typeof a == "number") {
        const temp: number = a;
        a = <Reference<Matrix.Matrix>> b;
        b = temp;
    }
    if (typeof b == "number") {
        let data: number[] = [];
        for (let i = 0; i < a.value.data.length; ++i) {
            data.push(a.value.data[i] * b);
        }
        return { value: {
            data: data,
            size: a.value.size,
        }};
    }
    if (a.value.size.length == 2) {
        return multiply_plane(a, b);
    }
    let pointer: number[] = [];
    let size: number[] = [];
    for (let i = 0; i < a.value.size.length - 2; ++i) {
        if (a.value.size[i] != b.value.size[i]) { return {}; }
        size.push(a.value.size[i]);
        pointer.push(0);
    }
    let factors = [];
    {
        let factor = 1;
        for (let i = pointer.length - 1; i >= 0; --i) {
            factors.push(factor);
            factor *= size[i];
        }
        factors.reverse();
    }
    let data: number[] = [];
    const a_plane_length = a.value.size[a.value.size.length - 1] * a.value.size[a.value.size.length - 2];
    const a_plane_size = [a.value.size[a.value.size.length - 2], a.value.size[a.value.size.length - 1]];
    const b_plane_length = b.value.size[b.value.size.length - 1] * b.value.size[b.value.size.length - 2];
    const b_plane_size = [b.value.size[b.value.size.length - 2], b.value.size[b.value.size.length - 1]];
    while (true) {;
        let data_pointer = 0;
        for (let i = 0; i < pointer.length; ++i) {
            data_pointer += factors[i] * pointer[i];
        }
        let current_data = multiply_plane(
            { value: { data: a.value.data.slice(data_pointer * a_plane_length, (data_pointer + 1) * a_plane_length), size: a_plane_size } },
            { value: { data: b.value.data.slice(data_pointer * b_plane_length, (data_pointer + 1) * b_plane_length), size: b_plane_size } },
        );
        if (current_data.value === undefined) { return {}; }
        data = data.concat(current_data.value.data);
        if (multiply_iterator_increment({ value: pointer }, { value: size })) { break; }
    }
    return { value: {
        data: data,
        size: size.concat([a.value.size[0], b.value.size[1]]),
    }};
}

function multiply_iterator_increment(pointer: Reference<number[]>, size: Reference<number[]>): boolean {
    for (let i = pointer.value.length - 1; i >= 0; --i) {
        ++pointer.value[i];
        if (pointer.value[i] < size.value[i]) { return false; }
        pointer.value[i] = 0;
    }
    return true;
}

function multiply_plane(a: Reference<Matrix.Matrix>, b: Reference<Matrix.Matrix>): Result<Matrix.Matrix> {
    if (a.value.size.length != 2 || b.value.size.length != 2) { return {}; }
    if (a.value.size[1] != b.value.size[0]) { return {}; }
    const sum_size: number = a.value.size[1];
    let data: number[] = [];
    for (let y = 0; y < a.value.size[0]; ++y) {
        for (let x = 0; x < b.value.size[1]; ++x) {
            let sum = 0;
            for (let i = 0; i < a.value.size[1]; ++i) { sum += a.value.data[y * sum_size + i] * b.value.data[i * sum_size + x]; }
            data.push(sum);
        }
    }
    return { value: {
        data: data,
        size: [a.value.size[0], b.value.size[1]],
    } };
}
