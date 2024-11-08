import React from "react";
import {TransactionConfirmationPendingProps} from "./types";

export function TransactionConfirmationPending(props: TransactionConfirmationPendingProps) {
    const {
        onConfirm,
        onReject,
    } = props;

    return (
        <div>
            <h3 style={{ fontSize: '22px', fontWeight: 600, margin: '10px 0' }}>
                Confirm Action:
            </h3>
            <div>
                <button onClick={onReject} style={{ color: 'white', width: '100px', height: "50px", background: "#404040", borderRadius: "10px", fontWeight: 600 }}>
                    Reject
                </button>
                <button onClick={onConfirm} style={{ color: 'white', width: '100px', height: "50px", background: "rgb(47 196 80)", borderRadius: "10px", marginLeft: "20px", fontWeight: 600 }}>
                    Confirm
                </button>
            </div>
        </div>
    );
}