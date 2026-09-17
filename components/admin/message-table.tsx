"use client";

import { useState } from "react";
import { Message } from "@prisma/client";
import { format } from "date-fns";
import { Trash2, CheckCircle, Circle, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  toggleMessageReadAction,
  deleteMessageAction,
} from "@/lib/actions/admin-messages";

interface MessageTableProps {
  messages: Message[];
}

export function MessageTable({ messages }: MessageTableProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleToggleRead = async (
    id: string,
    currentStatus: boolean,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    setIsUpdating(id);
    try {
      await toggleMessageReadAction(id, !currentStatus);
      toast.success(currentStatus ? "Marked as unread" : "Marked as read");

      // Update selected message if it's currently open
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, isRead: !currentStatus });
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm("Are you sure you want to delete this message?")) return;

    setIsUpdating(id);
    try {
      await deleteMessageAction(id);
      toast.success("Message deleted");
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (error) {
      toast.error("Failed to delete message");
      setIsUpdating(null);
    }
  };

  const openMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      handleToggleRead(msg.id, false);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="border-border bg-surface-muted flex h-full flex-col items-center justify-center border border-dashed p-12 text-center">
        <Mail className="text-foreground-soft mb-4 h-12 w-12 opacity-50" />
        <p className="text-foreground-soft">No messages found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="border-border border">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-muted hover:bg-surface-muted">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="font-heading text-foreground-soft text-xs tracking-widest uppercase">
                Sender
              </TableHead>
              <TableHead className="font-heading text-foreground-soft text-xs tracking-widest uppercase">
                Date
              </TableHead>
              <TableHead className="font-heading text-foreground-soft text-right text-xs tracking-widest uppercase">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow
                key={msg.id}
                className={`cursor-pointer transition-colors ${msg.isRead ? "bg-transparent opacity-70" : "bg-surface-muted/30 font-medium"}`}
                onClick={() => openMessage(msg)}
              >
                <TableCell>
                  <button
                    onClick={(e) => handleToggleRead(msg.id, msg.isRead, e)}
                    disabled={isUpdating === msg.id}
                    className="text-foreground-soft hover:text-foreground transition-colors"
                  >
                    {isUpdating === msg.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : msg.isRead ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5 fill-current opacity-20" />
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{msg.senderName}</span>
                    <span className="text-foreground-soft text-xs font-normal">
                      {msg.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(msg.createdAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDelete(msg.id, e)}
                    disabled={isUpdating === msg.id}
                    className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedMessage}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
      >
        <DialogContent className="border-border rounded-none sm:max-w-[600px]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">
                  Message from {selectedMessage.senderName}
                </DialogTitle>
                <DialogDescription>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-foreground hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                  {" • "}
                  {format(
                    new Date(selectedMessage.createdAt),
                    "MMMM d, yyyy 'at' h:mm a"
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="bg-surface-muted border-border text-foreground-soft mt-6 border p-6 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.messageText}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleToggleRead(selectedMessage.id, selectedMessage.isRead)
                  }
                  className="border-border rounded-none"
                  disabled={isUpdating === selectedMessage.id}
                >
                  {isUpdating === selectedMessage.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : selectedMessage.isRead ? (
                    <Circle className="mr-2 h-4 w-4" />
                  ) : (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  )}
                  Mark as {selectedMessage.isRead ? "Unread" : "Read"}
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="rounded-none"
                  disabled={isUpdating === selectedMessage.id}
                >
                  {isUpdating === selectedMessage.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
