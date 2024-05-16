import { Program } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/programs`;

const getPrograms = async (): Promise<Program[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getPrograms;