import React, { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog.tsx";
import { useWedding } from "@/hooks/useWedding.tsx";
import { cn } from "@/lib/utils.ts";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  children?: React.ReactNode;
  multiline?: boolean;
  placeholder?: string;
  as?: keyof JSX.IntrinsicElements;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  className,
  children,
  multiline = false,
  placeholder = "Enter text...",
  as: Component = "div",
}) => {
  const { isLoggedIn } = useWedding();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleClick = () => {
    if (isLoggedIn) {
      setEditValue(value);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <>
      <Component
        className={cn(
          className,
          isLoggedIn && "editable-highlight"
        )}
        onClick={handleClick}
      >
        {children || value}
      </Component>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Text</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {multiline ? (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
                rows={4}
              />
            ) : (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditableText;