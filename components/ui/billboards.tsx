import { BillboardData } from "@/types";
import Image from "next/image";

interface BillboardProps {
  data: BillboardData;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div className="relative aspect-square md:aspect-[16/9] overflow-hidden rounded-xl">
        <Image
          src={data?.imageUrl}
          alt={data?.label}
          layout="fill" // Ensures the image fills the entire container
          objectFit="cover" // Ensures the image covers the container without distorting
          objectPosition="bottom" // Ensures the image is positioned to show the bottom part
          priority // Loads the image with priority
          style={{ transform: 'translateY(-10%)' }} // Moves the image upward
        />
    
      </div>
    </div>
  );
};

export default Billboard;
