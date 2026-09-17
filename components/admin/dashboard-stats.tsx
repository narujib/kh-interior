import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FolderOpen,
  Image as ImageIcon,
  MessageSquare,
  Clock,
} from "lucide-react";

interface DashboardStatsProps {
  totalProjects: number;
  totalGalleryItems: number;
  unreadMessages: number;
  latestProjectTitle?: string;
}

export function DashboardStats({
  totalProjects,
  totalGalleryItems,
  unreadMessages,
  latestProjectTitle,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border rounded-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-foreground-soft text-sm font-medium tracking-widest uppercase">
            Total Projects
          </CardTitle>
          <FolderOpen className="text-foreground-soft h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="font-heading text-2xl font-medium">
            {totalProjects}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-foreground-soft text-sm font-medium tracking-widest uppercase">
            Gallery Items
          </CardTitle>
          <ImageIcon className="text-foreground-soft h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="font-heading text-2xl font-medium">
            {totalGalleryItems}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-foreground-soft text-sm font-medium tracking-widest uppercase">
            Unread Messages
          </CardTitle>
          <MessageSquare className="text-foreground-soft h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="font-heading text-2xl font-medium">
            {unreadMessages}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border rounded-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-foreground-soft text-sm font-medium tracking-widest uppercase">
            Latest Project
          </CardTitle>
          <Clock className="text-foreground-soft h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="font-heading truncate text-lg font-medium">
            {latestProjectTitle || "None"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
