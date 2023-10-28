import Matrix from "./Matrix";


export function empty(...sizes: number[]): Matrix.Matrix {
    return {
        data: [],
        size: sizes,
    };
}


export function identity(...sizes: number[]): Matrix.Matrix {
    if (sizes.length == 0) { return { data: [], size: [] }; }
    let data: number[] = [];
    if (sizes.length == 1) {
        for (let i = 0; i < sizes[0]; ++i ) {
            data.push(1);
        }
        return {
            data: data,
            size: [sizes[0]],
        };
    }
    let max = 1;
    for (let i = 0; i < sizes.length - 2; ++i) {
        max *= sizes[i];
    }
    const row_size: number = sizes[sizes.length - 1];
    const plane_size: number = row_size * sizes[sizes.length - 2];
    let identity_plane: number[] = [];
    let next_one: number = 0;
    for (let i = 0; i < plane_size; ++i) {
        if (i == next_one && next_one != -1) {
            identity_plane.push(1);
            if (i % row_size == row_size - 1) { next_one = -1; continue; }
            next_one = i + row_size + 1;
            continue;
        }
        identity_plane.push(0);
    }
    for (let i = 0; i < max; ++i) {
        data = data.concat(identity_plane);
    }
    return {
        data: data,
        size: sizes,
    };
}
