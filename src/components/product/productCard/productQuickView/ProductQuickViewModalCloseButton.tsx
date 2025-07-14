import React from 'react';

export default function QuickViewModalCloseButton({
  onCloseAction,
  buttonRef,
}: {
  onCloseAction: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <button
      className="govuk-button govuk-button--secondary close-button"
      onClick={onCloseAction}
      ref={buttonRef}
      aria-label="Close Quick View Modal"
    >
      Close
    </button>
  );
}





// import { SetStateAction } from "react";

// export default function ProductQuickViewModalCloseButton({onCloseAction}:{onCloseAction:(value:SetStateAction<boolean>) => void}) {

//     return(
//          <button type="button" className="govuk-button govuk-button--warning" data-module="govuk-button" onClick={()=> onCloseAction(false)}>Close</button>
//     );

// }