import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

interface Message {
  id: string;
  senderName: string;
  email: string;
  whatsapp: string;
  messageText: string;
  isRead: boolean;
  createdAt: Date;
}

interface RecentMessagesProps {
  messages: Message[];
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  return (
    <Card className="border-border rounded-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle className="font-heading text-lg font-medium">
          Pesan Terbaru
        </CardTitle>
        <Link
          href="/admin/messages"
          className="text-foreground-soft hover:text-foreground text-xs tracking-widest uppercase transition-colors"
        >
          Lihat Semua
        </Link>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MessageSquare className="text-border mb-4 h-8 w-8" />
            <p className="text-foreground-soft text-sm">
              Tidak ada pesan terbaru.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className="border-border flex flex-col gap-2 border-b pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{message.senderName}</p>
                    <p className="text-foreground-soft text-xs">
                      {message.email} &bull; {message.whatsapp}
                    </p>
                  </div>
                  {!message.isRead && (
                    <Badge
                      variant="default"
                      className="bg-foreground hover:bg-foreground/90 text-white-soft rounded-none px-2 py-0.5 text-[10px] tracking-widest uppercase"
                    >
                      Baru
                    </Badge>
                  )}
                </div>

                <p className="text-foreground-soft line-clamp-2 text-sm leading-relaxed">
                  {message.messageText}
                </p>

                <div className="text-foreground-soft/70 mt-1 flex items-center gap-1.5 text-xs">
                  <Calendar className="h-3 w-3" />
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                    locale: id,
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
