import { useQuery } from "@tanstack/react-query";
import { QuizItem } from "@/types";

const QUIZ_ENDPOINT =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

export function useQuiz() {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: async (): Promise<QuizItem[]> => {
      const response = await fetch(QUIZ_ENDPOINT);
      const data = await response.json();
      if (data.response_code !== 0) {
        throw new Error("Failed to fetch quiz data");
      }
      return data.results;
    },
    staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
    refetchOnWindowFocus: false,
  });
}
