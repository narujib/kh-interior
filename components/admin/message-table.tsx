"use client";

import { useState } from "react";
import { Message } from "@/generated/prisma/client";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
      toast.success(
        currentStatus ? "Ditandai belum dibaca" : "Ditandai sudah dibaca"
      );

      // Update selected message if it's currently open
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, isRead: !currentStatus });
      }
    } catch {
      toast.error("Gagal memperbarui status");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setIsUpdating(id);
    try {
      await deleteMessageAction(id);
      toast.success("Pesan dihapus");
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch {
      toast.error("Gagal menghapus pesan");
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
        <p className="text-foreground-soft">Tidak ada pesan yang ditemukan.</p>
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
                Pengirim
              </TableHead>
              <TableHead className="font-heading text-foreground-soft text-xs tracking-widest uppercase">
                Tanggal
              </TableHead>
              <TableHead className="font-heading text-foreground-soft text-right text-xs tracking-widest uppercase">
                Aksi
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
                      {msg.email} &bull; {msg.whatsapp}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(msg.createdAt), "MMM d, yyyy", {
                    locale: idLocale,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div onClick={(e) => e.stopPropagation()}>
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isUpdating === msg.id}
                            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                          />
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Hapus</span>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="border-border rounded-none">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-heading">
                            Hapus Pesan
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus pesan dari{" "}
                            {msg.senderName}? Tindakan ini tidak dapat
                            dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-none">
                            Batal
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) =>
                              handleDelete(
                                msg.id,
                                e as unknown as React.MouseEvent
                              )
                            }
                            className="rounded-none bg-red-600 text-white hover:bg-red-700"
                            disabled={isUpdating === msg.id}
                          >
                            {isUpdating === msg.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
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
                  Pesan dari {selectedMessage.senderName}
                </DialogTitle>
                <DialogDescription>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-foreground hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                  {" • "}
                  <a
                    href={`https://wa.me/${selectedMessage.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline"
                  >
                    {selectedMessage.whatsapp}
                  </a>
                  {" • "}
                  {format(
                    new Date(selectedMessage.createdAt),
                    "MMMM d, yyyy 'pada' h:mm a",
                    { locale: idLocale }
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
                  Tandai{" "}
                  {selectedMessage.isRead ? "Belum Dibaca" : "Sudah Dibaca"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger
                    render={
                      <Button
                        variant="destructive"
                        className="rounded-none"
                        disabled={isUpdating === selectedMessage.id}
                      />
                    }
                  >
                    {isUpdating === selectedMessage.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Hapus
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-border rounded-none">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-heading">
                        Hapus Pesan
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus pesan ini? Tindakan
                        ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-none">
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="rounded-none bg-red-600 text-white hover:bg-red-700"
                        disabled={isUpdating === selectedMessage.id}
                      >
                        {isUpdating === selectedMessage.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
