"use client";

import { useEffect, useState } from "react";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  type Post,
} from "@/lib/api/posts";
import type { PostFormData } from "@/lib/validations/post";
import { PostFormDialog } from "@/components/post-form-dialog";
import { DeleteDialog } from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadPosts = () => {
    getPosts()
      .then(setPosts)
      .catch(() => toast.error("Failed to load posts"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreate = async (data: PostFormData) => {
    setSubmitting(true);
    try {
      await createPost(data);
      toast.success("Post created successfully");
      setFormOpen(false);
      loadPosts();
    } catch {
      toast.error("Failed to create post. Slug may already exist.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: PostFormData) => {
    if (!editPost) return;
    setSubmitting(true);
    try {
      await updatePost(editPost.slug, data);
      toast.success("Post updated successfully");
      setEditPost(null);
      loadPosts();
    } catch {
      toast.error("Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    try {
      await deletePost(deleteTarget.slug);
      toast.success("Post deleted successfully");
      setDeleteTarget(null);
      loadPosts();
    } catch {
      toast.error("Failed to delete post");
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = (post: Post) => {
    setEditPost(post);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Admin</h1>
        <Button onClick={() => setFormOpen(true)}>New Post</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Create your first post!</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="text-muted-foreground">{post.slug}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteTarget(post)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Create Dialog */}
      <PostFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
        loading={submitting}
      />

      {/* Edit Dialog */}
      {editPost && (
        <PostFormDialog
          open={!!editPost}
          onClose={() => setEditPost(null)}
          onSubmit={handleUpdate}
          defaultValues={{
            title: editPost.title,
            slug: editPost.slug,
            content: editPost.content,
          }}
          loading={submitting}
        />
      )}

      {/* Delete Dialog */}
      {deleteTarget && (
        <DeleteDialog
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          title={deleteTarget.title}
          loading={submitting}
        />
      )}
    </div>
  );
}
