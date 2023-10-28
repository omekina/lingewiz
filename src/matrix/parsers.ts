import Matrix from "./Matrix";
import Result from "../Result";
import Reference from "../Reference";


export function from_array(data: any[]): Result<Matrix.Matrix> {
    let size: number[] = [];
    let pointer: number[] = [];
    // Find sizes and depth
    {
        let temp: any = data;
        while (true) {
            if (typeof temp == "number") { break; }
            if (!Array.isArray(temp)) { return {}; }
            size.push(temp.length);
            pointer.push(0);
            if (temp.length == 0) { return {}; }
            temp = temp[0];
        }
        if (size.length == 0) {
            size.push(0);
            pointer.push(0);
        }
    }
    // Check sizes, types and flatten array
    let flattened_data: number[] = [];
    while (true) {
        let temp: any = data;
        for (let i = 0; i < pointer.length; ++i) {
            if (!Array.isArray(temp) || temp.length != size[i]) { return {}; }
            if (temp.length == 0) { return {}; }
            temp = temp[pointer[i]];
        }
        if (typeof temp != "number") { return {}; }
        flattened_data.push(temp);
        if (from_array_iterator_increment({ value: pointer }, { value: size })) {
            break;
        }
    }
    return { value: {
        data: flattened_data,
        size: size,
    }};
}

function from_array_iterator_increment(pointer: Reference<number[]>, size: Reference<number[]>): boolean {
    for (let i = pointer.value.length - 1; i >= 0; --i) {
        ++pointer.value[i];
        if (pointer.value[i] < size.value[i]) { break; }
        if (i == 0) { return true; }
        pointer.value[i] = 0;
    }
    return false;
}
