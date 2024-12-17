import React from "react"
import { getValue } from './pickFromSyntheticEvent'
import { preventDefault } from "./preventDefault"
import { stopPropagation } from "./stopPropagation"

export function NotStandartLink(props: any) {
    return (<a onClick={preventDefault(stopPropagation(props.onClick))}>Hello!</a>)
}

interface InputProps {
    onChange: (value: string) => void
    value: string
}

export function Input({value, onChange}: InputProps) {
    return (
        <input value={value} onChange={preventDefault(stopPropagation(getValue(onChange)))} />
    )
}