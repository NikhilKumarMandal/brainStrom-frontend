import React from "react";

export default function LeaveTeamModal({
  leaveReason,
  setLeaveReason,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[28rem] flex flex-col gap-4 text-white">
      <h2 className="text-xl font-semibold text-red-400">Leave Team</h2>
      <p className="text-sm text-gray-300">
        Are you sure you want to leave the team? Please provide a reason:
      </p>
      <textarea
        value={leaveReason}
        onChange={(e) => setLeaveReason(e.target.value)}
        placeholder="Enter reason here..."
        className="bg-gray-700 text-white p-2 rounded resize-none min-h-[100px]"
      />
      <div className="flex justify-end gap-4 mt-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500"
        >
          Confirm Leave
        </button>
      </div>
    </div>
  );
}
