import { SetStateAction } from "react";

export default function ProductQuickViewModalCloseButton({onCloseAction}:{onCloseAction:(value:SetStateAction<boolean>) => void}) {

    return(
         <button type="button" className="govuk-button govuk-button--warning" data-module="govuk-button" onClick={()=> onCloseAction(false)}>Close</button>
    );

}