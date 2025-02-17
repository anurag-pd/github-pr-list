import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Label {
  id: string;
  name: string;
}

interface PR {
  id: number;
  title: string;
  html_url: string;
  created_at: string;
  labels: Label[];
}

const GITHUB_API_URL = `https://api.github.com/repos/${
  import.meta.env.VITE_GITHUB_REPO
}/pulls`;

console.log(GITHUB_API_URL);

const fetchPRs = async (): Promise<PR[]> => {
  const response = await axios.get(GITHUB_API_URL, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` },
  });
  return response.data;
};

export const useFetchPRs = () => {
  return useQuery({
    queryKey: ["pullRequests"], // Query key (an array)
    queryFn: fetchPRs, // The query function that fetches the data
  });
};
