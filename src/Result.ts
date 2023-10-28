type Result<Type> = {
    value?: Type,
};

 
export default Result;


export function unwrap<Type>(value: Result<Type>): Type {
    if (value.value === undefined) { throw new Error("Error on unwrap."); }
    return value.value;
}
