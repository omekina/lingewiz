import * as Factories from "./factories";
import * as Parsers from "./parsers";
import * as Output from "./output";


/**
 * Lingewiz matrix computation API
*/
namespace Matrix {
    /**
     * Matrix object
     */
    export type Matrix = {
        data: number[],
        size: number[],
    };

    /**
     * Creates matrix object from deeply nested arrays.
     * @param {any[]} data - Deeply nested array
     * @returns {(Matrix.Matrix | null)} Matrix on success and null on fail
     * 
     * Warning: Empty arrays are not allowed. Use the explicit empty factory instead.
     */
    export var from_array = Parsers.from_array;

    /**
     * Creates a matrix object from size.
     * 
     * Can take arbitrary amount of numbers as arguments.
     */
    export var empty = Factories.empty;

    /**
     * Generates identity matrix.
     * 
     * - When generating more than 2 dimensions, the identity 2D plane will repeat in higher dimensions.
     * 
     * - When generating less than 2 dimensions, this function will simply generate a row of ones.
     * 
     * Warning: Non-2D arrays are only useful in the context of this library.
     */
    export var identity = Factories.identity;

    /**
     * Converts matrix to string.
     * 
     * @param {string} row_separator - Will get appended between rows.
     * @returns {string} Stream of characters.
     */
    export var to_string = Output.to_string;
}


export default Matrix;
