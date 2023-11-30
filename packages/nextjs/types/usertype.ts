export const userType = (type: string) => {
    if(type === "customer") return 1;
    if(type === "bank") return 2;
    if(type === "merchant") return 3;
    if(type === "staker") return 3;
    return 0;
}