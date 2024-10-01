"use client";

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <dialog
      open={true}
      className="modal fixed inset-0 flex items-center justify-center"
    >
      {children}
    </dialog>
  );
};
