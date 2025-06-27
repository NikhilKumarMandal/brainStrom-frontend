import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Trash2, MessageSquare, Clock, Eye } from "lucide-react";

export function NoticeBoard({ notice, onUpdateNotice, canEdit, isLeader }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(notice.title);
  const [editContent, setEditContent] = useState(notice.content);

  const handleSaveNotice = () => {
    onUpdateNotice({
      ...notice,
      title: editTitle,
      content: editContent,
      timestamp: "Just now",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white border-2 border-gray-200 shadow-lg">
        <CardHeader className="bg-gray-100 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Current Notice</CardTitle>
            </div>
            {canEdit && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                {isLeader && (
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-8 bg-white min-h-[300px]">
          {isEditing && canEdit ? (
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
                <Textarea
                  id="content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[150px] text-base leading-relaxed"
                  placeholder="Write your notice here..."
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveNotice}>Save Notice</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {notice.title}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {notice.content}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{notice.author}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {notice.timestamp}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Member View Message */}
      {!canEdit && (
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
