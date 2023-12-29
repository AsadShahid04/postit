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
  //console.log(data);
  return (
    <div>
      Data Below
      {data?.Post?.map((post) => (
        <>
          {console.log(data)}
          <h1>{post.title}</h1>
        </>
      ))}
    </div>
  );
}
