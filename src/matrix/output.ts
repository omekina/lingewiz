import Matrix from "./Matrix";
import Reference from "../Reference";


export function to_string(data: Matrix.Matrix, row_separator: string = "\n"): string {
    if (data.size.length == 0) { return ""; }
    let result: string = "";
    const row_size = data.size[data.size.length - 1];
    if (data.size.length == 1) {
        for (let i = 0; i < row_size; ++i) {
            result += String(data.data[i]) + " ";
        }
        return result;
    }
    const column_size = data.size[data.size.length - 2];
    let pointer: number[] = [];
    for (let i = 0; i < data.size.length - 2; ++i) { pointer.push(0); }
    for (let i = 0; i < data.data.length; ++i) {
        if (i % row_size == 0) {
            result += row_separator;
            if (data.size.length > 2 && Math.floor(i / row_size) % column_size == 0) {
                result += row_separator + to_string_iterator_increment({value:pointer}, {value:data.size}) + row_separator;
            }
        }
        result += String(data.data[i]) + " ";
    }
    return result;
}

function to_string_iterator_increment(pointer: Reference<number[]>, size: Reference<number[]>): string {
    let result = "Position: ";
    for (let i = 0; i < pointer.value.length; ++i) {
        if (i != 0) { result += ", "; }
        result += String(pointer.value[i]);
    }
    for (let i = pointer.value.length - 1; i >= 0; --i) {
        ++pointer.value[i];
        if (pointer.value[i] < size.value[i]) { break; }
        pointer.value[i] = 0;
    }
    return result;
}
