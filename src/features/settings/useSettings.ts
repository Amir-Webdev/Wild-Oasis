import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { data, isPending, error } = useQuery({
    queryKey: ["Settings"],
    queryFn: getSettings,
  });
  return { data, isPending, error };
}
