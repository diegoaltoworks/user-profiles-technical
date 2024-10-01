"use client";

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <dialog
      open={true}
      className="modal fixed inset-0 flex items-center justify-center"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop fixed inset-0">
        <button>close</button>
      </form>
    </dialog>
  );
};
