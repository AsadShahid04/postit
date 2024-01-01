"use client";

import EditPost from "./EditPost";
import { useQuery } from "react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryKey: ["auth-posts"],
    queryFn: fetchAuthPosts,
  });

  if (isLoading) return <h1>Posts are loading...</h1>;

  // Check if there are no posts available
  if (!data?.Post || data.Post.length === 0) {
    return <h1>No posts to display.</h1>;
  }

  //console.log(data);
  return (
    <div>
      {/* Data Below */}
      {data?.Post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </div>
  );
}
