import React from 'react';
import { CollectionsIcon } from '../AppIcons/CollectionsIcon';
import { EnterIcon } from '../AppIcons/EnterIcon';
import { ExitIcon } from '../AppIcons/ExitIcon';
import { MeIcon } from '../AppIcons/MeIcon';

interface IIcons {
    [K: string]: JSX.Element
}

const icons:IIcons = {
    enter: <EnterIcon />,
    exit: <ExitIcon />,
    me: <MeIcon />,
    collections: <CollectionsIcon />
}

interface IIconProps {
    name: keyof typeof icons
}

export function Icon({ name }: IIconProps) {
    return (
        <span>
            {icons[name]}
        </span>
    )
}