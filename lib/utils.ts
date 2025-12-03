import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(func: Function, wait: number) {
  console.log("func: ", func);
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: any[]) {
    const later = () => setTimeout(() => func(...args), wait);
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
