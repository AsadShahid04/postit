"use client";

import Post from "./components/Post";
import AddPost from "./components/AddPost";
import { useQuery } from "react-query";
import axios from "axios";
import { PostType } from "./types/Posts";

//Fetch All posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <div>
      <AddPost />
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          //avatar={post.user.image} //TODO: Add avatar
          postTitle={post.title}
          comments={post.Comment}
        />
      ))}
    </div>
  );
}
