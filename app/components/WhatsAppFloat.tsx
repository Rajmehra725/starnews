"use client";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/917987667358"
      target="_blank"
      className="
      fixed 
      bottom-20 
      right-4 
      z-50 
      bg-green-500 
      p-3 
      rounded-full 
      shadow-lg
      hover:scale-110 
      transition
      "
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
        alt="whatsapp"
        className="w-6 h-6"
      />
    </a>
  );
}