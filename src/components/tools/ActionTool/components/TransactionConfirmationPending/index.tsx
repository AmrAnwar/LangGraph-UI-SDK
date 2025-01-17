import React from "react";
import { TransactionConfirmationPendingProps } from "./types";

export function TransactionConfirmationPending(
  props: TransactionConfirmationPendingProps
) {
  const { onConfirm, onReject } = props;

  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={onConfirm}
        className="py-2 px-3
          text-sm font-medium text-center
          text-white bg-green-600 rounded-lg
          hover:bg-green-700 focus:ring-4
          focus:outline-none
          focus:ring-green-300
          dark:bg-green-500
          dark:hover:bg-green-600
          dark:focus:ring-green-900
          "
      >
        ✓ Confirm
      </button>
      <button
        onClick={onReject}
        className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600
          "
      >
        Reject
      </button>
    </div>
  );
}
