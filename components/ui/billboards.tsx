import { BillboardData } from "@/types";

interface BillboardProps {
  data: BillboardData;
}

const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  console
  return ( 
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div style={{ backgroundImage: `url(${data?.imageUrl})` }} className="rounded-xl relative aspect-square md:aspect-[16/9] overflow-hidden bg-contain bg-no-repeat ">
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
        </div>
      </div>
    </div>
   );
};

export default Billboard;