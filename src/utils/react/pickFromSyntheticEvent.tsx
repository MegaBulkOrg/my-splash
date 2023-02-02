import React from "react";

export function pickFromSyntheticEvent<T extends HTMLElement>() {
    return <K extends keyof T>(key: K) =>
        <E extends ((t: T[K]) => void)>(Fn: E) =>
            (e: React.SyntheticEvent<T>) => 
                Fn(e.currentTarget[key]);
}

export const getValue = pickFromSyntheticEvent<HTMLInputElement>()('value')
export const getChecked = pickFromSyntheticEvent<HTMLInputElement>()('checked')