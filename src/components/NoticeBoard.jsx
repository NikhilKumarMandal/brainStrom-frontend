import { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Edit3,
  Trash2,
  MessageSquare,
  Clock,
  Eye,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNotice, editNotice, getNotice } from "@/http/api";
import RichTextEditor from "./RichTextEditor";
import { toast } from "sonner";
import { timeAgo } from "@/utils/formateTime";

async function getNoticeboard(teamId) {
  const { data } = await getNotice(teamId);
  return data.data?.[0] || null;
}

export function NoticeBoard({ teamId, hasPermission, members }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { data: notice, isLoading: noticeLoading } = useQuery({
    queryKey: [teamId, "notice"],
    queryFn: () => getNoticeboard(teamId),
  });

  const author = members.find((member) => member.user.id === notice?.createdBy);

  useEffect(() => {
    if (notice) {
      setEditTitle(notice.title || "");
      setEditContent(notice.content || "");
    }
  }, [notice]);

  const editNoticeMutation = useMutation({
    mutationFn: ({ teamId, title, content }) =>
      editNotice(teamId, title, content),
    onSuccess: async () => {
      await queryClient.invalidateQueries([teamId, "notice"]);
      await queryClient.refetchQueries([teamId, "notice"]);
      toast.success("Notice updated successfully");
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      toast.error(`Failed to update notice: ${error.message}`);
    },
  });

  const deleteNoticeMutation = useMutation({
    mutationFn: ({ noticeId }) => deleteNotice(noticeId),
    onSuccess: async () => {
      await queryClient.invalidateQueries([teamId, "notice"]);
      toast.success("Notice deleted");
    },
    onError: () => toast.error("Failed to delete notice"),
  });

  if (noticeLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  // console.log(notice)

  return (
    <div className="space-y-4">
      <Card className="bg-white border-2 border-gray-200 shadow-lg p-0">
        <CardHeader className="bg-gray-100 border-b rounded-t-lg pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Current Notice</CardTitle>
            </div>
            {hasPermission && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                {hasPermission && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      deleteNoticeMutation.mutate({ noticeId: notice.id })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-8 bg-white min-h-[300px] rounded-b-lg">
          {isEditing && hasPermission ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="text-xl font-semibold"
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <RichTextEditor
                  content={editContent}
                  onChange={setEditContent}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    editNoticeMutation.mutate({
                      teamId,
                      title: editTitle,
                      content: editContent,
                    })
                  }
                >
                  {editNoticeMutation.isPending ? "Saving..." : "Save Notice"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (notice ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {notice?.title}
              </h2>
              <RichTextEditor content={notice?.content} readOnly />
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      {author?.user?.name?.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {author?.user?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {timeAgo(notice?.createdAt)}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                No notice found
              </h2>
              <p className="text-sm text-gray-500">
                No notice has been created yet.
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {!hasPermission && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Eye className="h-4 w-4" />
              <span className="text-sm">
                You're viewing as a team member. Contact your team leader to
                make changes.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
