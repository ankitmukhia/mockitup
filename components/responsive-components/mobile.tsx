import { Logo } from "@/assets/svg";

export const Mobile = () => {
  return (
    <div
      className="flex flex-col h-dvh items-center justify-center"
      // style={{
      // 	backgroundImage: "linear-gradient(to bottom, rgba(87, 87, 87, 0.8), rgba(21, 21, 21, 0.2))"
      // }}
    >
      <div className="max-w-[29rem] text-center space-y-2">
        <Logo className="text-center w-full" />

        <h1 className="font-medium text-[33px] tracking-[0.022rem] leading-[50px] text-foreground/90 font-inter">
          Create Amazing Mockups
        </h1>

        <p className="max-w-sm mx-auto text-[14.5px] tracking-[0.030rem] font-normal text-foreground/60">
          It’s designed specifically for larger screens and isn’t supported on
          mobile yet.
        </p>
      </div>
    </div>
  );
};
