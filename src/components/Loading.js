import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
      Loading...
    </div>
  );
};

export default Loading;
