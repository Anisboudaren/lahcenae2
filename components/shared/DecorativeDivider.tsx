import Image from "next/image";

export function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center my-12">
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent" />
      <div className="mx-4 relative w-12 h-12 opacity-60">
        <Image
          src="/illustration/red illustration steering weel no background .png"
          alt=""
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent" />
    </div>
  );
}
