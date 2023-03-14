export enum ROLES {
    SADM = 'SADM',
    ADM = 'ADM',
    AM = 'AM',
    AC = 'AC',
    DECIDEUR = 'DECIDEUR',
    CLIENT = 'CLIENT',
}

export const isSADM = (role:string) => {
    return role === ROLES.SADM;
}

export const isADM = (role:string) => {
    return role === ROLES.ADM;
}

export const isAM = (role:string) => {
    return role === ROLES.AM;
}

export const isAC = (role:string) => {
    return role === ROLES.AC;
}

export const isDecideur = (role:string) => {
    return role === ROLES.DECIDEUR;
}

export const isClient = (role:string) => {
    return role === ROLES.CLIENT
}