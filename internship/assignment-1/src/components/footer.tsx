interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`text-center py-4 text-white bg-[#FFFFFF] h-16 ${className}`}>
      Copyright © 2025 - Quote Generator
    </footer>
  );
}