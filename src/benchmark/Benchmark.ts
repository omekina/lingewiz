/**
 * Lingewiz benchmarking API
 * 
 * Is used to measure number of milliseconds between function start and function stop.
 */
namespace Benchmark {
    let time_start: number | null = null;

    /** @function
     * Starts the stopwatch.
     * 
     * Warning: Only one benchmark can be running at a time.
     * 
     * Hint: You can use stop multiple times without calling start between.
     */
    export function start(): void {
        time_start = (new Date()).getTime();
    }

    /**
     * Outputs the current time-delta to console.
     * 
     * @param {string=} label - Label for the currently ended benchmark
     * @returns {(number | null)} Number of milliseconds since start
     */
    export function stop(label: string = ""): number | null {
        if (time_start === null) {
            console.warn("[Benchmark] Start was never called" + (label == "" ? "" : (" on '" + label + "'")));
            return null;
        }
        const result = (new Date()).getTime() - time_start;
        console.log("[Benchmark] " + (label == "" ? "" : ("" + label + ": ")) + String(result));
        return result;
    }
}


export default Benchmark;
