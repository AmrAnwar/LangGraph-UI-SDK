import React, { useState } from "react";
import { TransactionConfirmationPendingProps } from "./types";
import { darken } from "../../../../../utils";

export function TransactionConfirmationPending(
  props: TransactionConfirmationPendingProps
) {
  const { onConfirm, onReject, colors } = props;
  const [isPrimaryHover, setIsPrimaryHover] = useState(false);
  const [isCancellationHover, setIsCancellationHover] = useState(false);

  let { primary, cancellation } = colors ?? {};
  primary = primary ?? "#000000";
  const primaryHover = darken(primary, 10);
  cancellation = cancellation ?? "#9CA3AF";
  const cancellationHover = darken(cancellation, 10);
  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        style={{
          backgroundColor: isPrimaryHover ? primaryHover : primary,
        }}
        onMouseEnter={() => {
          setIsPrimaryHover(!isPrimaryHover);
        }}
        onMouseOut={() => {
          setIsPrimaryHover(!isPrimaryHover);
        }}
        onClick={onConfirm}
        className="          
        chatbot-tool-confirmation-button
          py-2 px-3
          text-sm font-medium text-center
          text-white rounded-lg
           focus:ring-4
          focus:outline-none"
      >
        ✓ Confirm
      </button>

      <button
        style={{
          backgroundColor: isCancellationHover
            ? cancellationHover
            : cancellation,
        }}
        onMouseEnter={() => {
          setIsCancellationHover(!isCancellationHover);
        }}
        onMouseOut={() => {
          setIsCancellationHover(!isCancellationHover);
        }}
        onClick={onReject}
        className="          
        chatbot-tool-rejection-button
          py-2 px-3 text-sm font-medium
          text-white  rounded-lg
           focus:ring-4
          focus:outline-none"
      >
        Reject
      </button>
    </div>
  );
}
