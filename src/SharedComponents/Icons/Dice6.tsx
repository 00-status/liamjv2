import { ReactElement } from "react";

type Props = {
    className: string
};

export const Dice6 = (props: Props): ReactElement => {
    return <svg className={props.className} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M1.852,5.59,10.457.428a2.989,2.989,0,0,1,3.086,0L22.065,5.54,12,11.508ZM11,13.242,1,7.408V18.093l9.457,5.674A2.982,2.982,0,0,0,11,24Zm2,0V24a3.021,3.021,0,0,0,.544-.233L23,18.093V7.311Z"/>
        <title>dice 6</title>
    </svg>
};
