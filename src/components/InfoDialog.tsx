import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface InfoDialogProps {
  title: string;
  items: string[];
  trigger: React.ReactNode; // what opens the dialog (e.g., "+5 more" button)
}

export function InfoDialog({ title, items, trigger }: InfoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md ">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="flex flex-wrap gap-2 mt-2">
            {items.map((item, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
