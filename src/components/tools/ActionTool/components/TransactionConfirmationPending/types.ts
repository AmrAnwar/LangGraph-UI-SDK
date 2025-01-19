import { ColorsConfig } from "../../../../../types";

export type TransactionConfirmationPendingProps = {
  onConfirm: () => void;
  onReject: () => void;
  colors: ColorsConfig;
};
