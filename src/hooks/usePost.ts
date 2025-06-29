"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import useModalStore from "@/lib/store/modal-store";
import { useGenselectors } from "@/lib/store/general-store";
import { CreateData, EditData, ErrorWithResponse } from "@/types/forms.type";
import { BlogPost } from "@/types/posts.type";

export const usePost = (id?: string) => {
  const { openModal, closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Create post mutation
  const createpostMutation = useMutation({
    mutationFn: async (data: CreateData) => {
      openModal("loading");
      const res = await api.post("/posts", data);
      return res.data;
    },
    onSuccess: async (data: BlogPost) => {
      // Trigger revalidation of homepage
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
          path: "/", // homepage
        }),
      });
      const { id } = data;
      router.replace(`/posts/${id}`);
      closeModal();
      openToast("Post created Successfully", 4000);
    },
    onError: (error: ErrorWithResponse) => {
      closeModal();
      const message =
        error?.response?.data?.message || "An unexpected error occurred";
      openToast(message, 4000);
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      const res = await api.delete(`/posts/${postId}`);
      return res.data;
    },
    onSuccess: async () => {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
          path: "/", // homepage
        }),
      });
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.replace(`/`);
      closeModal();
      openToast("Post deleted Successfully", 4000);
    },
    onError: (error: ErrorWithResponse) => {
      closeModal();
      const message =
        error?.response?.data?.message || "An unexpected error occurred";
      openToast(message, 4000);
    },
  });

  // Edit post mutation
  const editpostMutation = useMutation({
    mutationFn: async (data: { id: string; postData: EditData }) => {
      openModal("loading");
      const res = await api.patch(`/posts/${data.id}`, data.postData);
      return res.data;
    },

    onSuccess: async () => {
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
          path: "/", // homepage
        }),
      });
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      await queryClient.invalidateQueries({ queryKey: ["posts-id"] });
      router.replace(`/`);
      closeModal();
      openToast("Post updated Successfully", 4000);
    },
    onError: (error: ErrorWithResponse) => {
      closeModal();
      const message =
        error?.response?.data?.message || "An unexpected error occurred";
      openToast(message, 4000);
    },
  });

  // Get all posts query
  const getAllPosts = async () => {
    const { data }: { data: BlogPost[] } = await api.get(`/posts`);
    return data;
  };

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    staleTime: Infinity,
    enabled: !id, // Only run when not fetching single post
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Get single post query
  const getSinglePost = async () => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  };

  const {
    data: singlePost,
    isLoading: singlePostLoading,
    isError: singlePostError,
    refetch: refetchSinglePost,
  } = useQuery({
    queryKey: ["posts-id", id],
    queryFn: getSinglePost,
    staleTime: Infinity,
    enabled: !!id, // Only run when fetching single post
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    // Mutations
    createpostMutation,
    deletePostMutation,
    editpostMutation,

    // Queries
    posts: posts || [],
    singlePost: singlePost || null,
    postsLoading,
    singlePostLoading,
    postsError,
    singlePostError,
    refetchPosts,
    refetchSinglePost,

    // Helper methods
    isLoading: postsLoading || singlePostLoading,
    isError: postsError || singlePostError,
  };
};
