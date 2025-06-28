import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ReasonModal({
  title,
  description,
  open,
  onOpenChange,
  onConfirm,
  reason,
  setReason,
  isPending,
}) {
  const handleConfirm = () => {
    if (!reason.trim()) {
      alert("Please enter a reason.");
      return;
    }

    onConfirm(reason);
    setReason("");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setReason("");
        onOpenChange(val);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Textarea
            placeholder="Enter reason..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={isPending} onClick={handleConfirm}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
