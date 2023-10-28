import * as Factories from "./factories";
import * as Parsers from "./parsers";
import * as Output from "./output";
import * as Math from "./math";


/**
 * Lingewiz matrix computation API
*/
namespace Matrix {
    /**
     * Matrix object
     * 
     * Warning: Matrix object should not be created manually. If you make Matrix object manually, the behaviour is undefined.
     */
    export type Matrix = {
        data: number[],
        size: number[],
    };

    /**
     * Creates matrix object from deeply nested arrays.
     * @param {any[]} data - Deeply nested array
     * @returns {Result<Matrix.Matrix>} Parsed matrix
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

    /**
     * Performs element-wise addition. Parameters can be Matrix references or numbers.
     * 
     * When adding two numbers, this function returns a matrix with size 1.
     * 
     * @returns {Result<Matrix.Matrix>} Addition result
     */
    export var add: Math.MatrixElementWiseOperation = (a, b) => { return Math.element_math_operation(a, b, (a, b) => { return a + b; }); };

    /**
     * Performs element-wise subtraction. Parameters can be Matrix references or numbers.
     * 
     * When subtracting two numbers, this function returns a matrix with size 1.
     * 
     * @returns {Result<Matrix.Matrix>} Subtraction result
     */
    export var subtraction: Math.MatrixElementWiseOperation = (a, b) => { return Math.element_math_operation(a, b, (a, b) => { return a - b; }); };

    /**
     * Performs element-wise multiplication. Parameters can be Matrix references or numbers.
     * 
     * When multiplying two numbers, this function returns a matrix with size 1.
     * 
     * @returns {Result<Matrix.Matrix>} Multiplication result
     */
    export var element_multiply: Math.MatrixElementWiseOperation = (a, b) => { return Math.element_math_operation(a, b, (a, b) => { return a * b; }); };

    /**
     * Performs division. Parameters can be Matrix references or numbers.
     * 
     * When dividing two numbers, this function returns a matrix with size 1.
     * 
     * @returns {Result<Matrix.Matrix>} Division result
     */
    export var element_divide: Math.MatrixElementWiseOperation = (a, b) => { return Math.element_math_operation(a, b, (a, b) => { return a / b; }); };

    /**
     * Performs standard matrix multiplication. Parameters can be Matrix references or numbers.
     * 
     * When multiplying two numbers, this function returns a matrix with size 1.
     * 
     * @returns {Result<Matrix.Matrix>} Multiplication result
     */
    export var multiply = Math.multiply;
}


export default Matrix;
