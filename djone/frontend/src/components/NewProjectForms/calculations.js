export const calculateTouchVoltageAllowed = (clearingTime) => {
    let result = 0;
    if (clearingTime > 5) result= 50;
    else if (clearingTime > 0.9 && clearingTime <= 5) result = (clearingTime**-0.274086806)*77.72280398;
    else if (clearingTime > 0.1 && clearingTime <= 0.9) result = (clearingTime**-0.987178883)*72.09732587;
    else result = 700;
    return Math.round(result);
}
