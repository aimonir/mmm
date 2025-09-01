import Link from 'next/link';
import Image from 'next/image';

const WhatsAppButton = () => {
  const whatsappNumber = '+8801910333312';
  const message = 'Hello, I have a question about your exam suggestions.'; // Default message

  return (
    <Link
      href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
    >
      <Image src="/whatsapp.svg" alt="WhatsApp" width={30} height={30} />
    </Link>
  );
};

export default WhatsAppButton;
