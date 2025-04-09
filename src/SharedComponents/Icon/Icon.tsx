
import { ReactNode } from 'react';

import './icon.css';
import { CloseIcon } from '../Icons/CloseIcon';
import { CopyIcon } from '../Icons/CopyIcon';
import { Dice4 } from '../Icons/Dice4';
import { Dice6 } from '../Icons/Dice6';
import { Dice8 } from '../Icons/Dice8';
import { Dice10 } from '../Icons/Dice10';
import { Dice12 } from '../Icons/Dice12';
import { Dice20 } from '../Icons/Dice20';
import { DownloadIcon } from '../Icons/DownloadIcon';
import { DragIcon } from '../Icons/DragIcon';
import { EditFileIcon } from '../Icons/EditFileIcon';
import { GearsIcon } from '../Icons/GearsIcon';
import { HomeIcon } from '../Icons/HomeIcon';
import { PencilIcon } from '../Icons/PencilIcon';
import { PlusIcon } from '../Icons/PlusIcon';
import { TauntIcon } from '../Icons/TauntIcon';
import { TrashIcon } from '../Icons/TrashIcon';
import { UploadIcon } from '../Icons/UploadFile';
import { VeryDissatisfiedIcon } from '../Icons/VeryDissatisfiedIcon';

// size: {small, medium, large}
// iconTheme: { dark, light, neon }
// iconType: { close, copy, dice4, etc }

export enum IconType {
    CLOSE,
    COPY,
    DICE4,
    DICE6,
    DICE8,
    DICE10,
    DICE12,
    DICE20,
    DOANLOAD,
    DRAG,
    EDIT_FILE,
    GEARS,
    HOME,
    PENCIL,
    PLUS,
    TAUNT,
    TRASH,
    UPLOAD_FILE,
    VERY_DISSATISFIED
};

const iconComponents: Record<IconType, ReactNode> = {
    [IconType.CLOSE]: <CloseIcon />,
    [IconType.COPY]: <CopyIcon />,
    [IconType.DICE4]: <Dice4 />,
    [IconType.DICE6]: <Dice6 />,
    [IconType.DICE8]: <Dice8 />,
    [IconType.DICE10]: <Dice10 />,
    [IconType.DICE12]: <Dice12 />,
    [IconType.DICE20]: <Dice20 />,
    [IconType.DOANLOAD]: <DownloadIcon />,
    [IconType.DRAG]: <DragIcon />,
    [IconType.EDIT_FILE]: <EditFileIcon />,
    [IconType.GEARS]: <GearsIcon />,
    [IconType.HOME]: <HomeIcon />,
    [IconType.PENCIL]: <PencilIcon />,
    [IconType.PLUS]: <PlusIcon />,
    [IconType.TAUNT]: <TauntIcon />,
    [IconType.TRASH]: <TrashIcon />,
    [IconType.UPLOAD_FILE]: <UploadIcon />,
    [IconType.VERY_DISSATISFIED]: <VeryDissatisfiedIcon />,
};

type Props = {
    iconType: IconType;
};

// TODO:
//      Update die.tsx to account for its super-large icons
//      Update the Taunt to account for its large icon.
//      Update icon to have color themes
//      Update home icon to use themes properly: ErrorBoundary, Page, TerminalPage

export const Icon = (props: Props) => {
    const { iconType } = props;

    return <svg className="icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        {iconComponents[iconType]}
    </svg>;
};

// function getClasses(theme?: HomeThemes): string {
//     switch (theme) {
//         case HomeThemes.DARK:
//             return"icon-dark";
//         case HomeThemes.LIGHT:
//             return "icon";
//         case HomeThemes.GREEN:
//             return "icon-green";
//         default:
//             return "icon";
//     }
// }

// type Props = {
//     theme?: HomeThemes;
// };

// export enum HomeThemes {
//     DARK = "dark",
//     LIGHT = "white",
//     GREEN = "green"
// };
