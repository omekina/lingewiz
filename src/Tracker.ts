import Reference from "./Reference";


/**
 * Wrapper for tracking states of a value.
 */
class Tracker<Type> {

    private data: Type[];

    public constructor(initial_value: Type) {
        this.data = [initial_value];
    }

    public set value(new_value: Type) {
        this.data.push(new_value);
    }

    public get value(): Type {
        return this.data[this.data.length - 1];
    }

    /**
     * Recorded states
     */
    public get history(): Reference<Type[]> {
        return { value: this.data };
    }
}


export default Tracker;
