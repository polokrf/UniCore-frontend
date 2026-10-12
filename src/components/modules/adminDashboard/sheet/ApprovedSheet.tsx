import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function ApprovedSheet({ approvedId }: { approvedId :string}) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Review</Button>} />
      <SheetContent>
        <h1> teacherId:{approvedId}</h1>
        <SheetFooter>
          <Button type="submit">Approved</Button>
          <Button type="submit">Rejected</Button>

          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
