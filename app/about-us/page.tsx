import SectionHeader from "../components/SectionHeader";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200 dark:border-gray-800">
      <SectionHeader title="हमारे बारे में (About Us)" badge="ABOUT" />

      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-150 dark:border-gray-800">
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white p-1 border-2 border-red-600 shadow shrink-0">
          <Image
            src="/logo.jpeg"
            alt="Star News Network"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-950 dark:text-white">
            स्टार न्यूज़ नेटवर्क (Star News Network)
          </h2>
          <p className="text-sm text-red-600 font-bold mt-0.5">
            सच्ची और निष्पक्ष पत्रकारिता का विश्वसनीय डिजिटल मंच
          </p>
          <p className="text-xs text-gray-500 mt-1">
            मध्य प्रदेश, विंध्य एवं बुंदेलखंड का अग्रणी समाचार संस्थान
          </p>
        </div>
      </div>

      <div className="space-y-5 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          हमारा परिचय व दृष्टिकोण
        </h3>
        <p>
          स्टार न्यूज़ नेटवर्क (Star News Network) एक स्वतंत्र, निष्पक्ष और जन-सरोकारों से जुड़ा डिजिटल समाचार पोर्टल है। हमारा प्रमुख उद्देश्य आम जनता की आवाज़ को प्रमुखता से शासन, प्रशासन और समाज के सामने लाना है।
        </p>

        <p>
          हम सतना, पन्ना, छतरपुर, मैहर, रीवा सहित संपूर्ण मध्य प्रदेश और देश-विदेश की ताज़ा, प्रामाणिक और त्वरित खबरों को अपने पाठकों तक पहुँचाते हैं। राजनीति, अपराध, विकास कार्य, कृषि, शिक्षा, स्वास्थ्य, खेल और संस्कृति से जुड़े हर पहलू पर हमारी पैनी नज़र रहती है।
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-3">
          हमारे प्रमुख मूल्य
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>सत्यता और विश्वसनीयता:</strong> बिना पुष्टि किए कोई खबर प्रकाशित नहीं करना।</li>
          <li><strong>निर्भीकता और निष्पक्षता:</strong> किसी भी राजनीतिक या व्यावसायिक दबाव से मुक्त पत्रकारिता।</li>
          <li><strong>जनहित को प्राथमिकता:</strong> दबे-कुचले, किसानों और युवाओं की समस्याओं को प्राथमिकता देना।</li>
          <li><strong>डिजिटल नवाचार:</strong> वेब पोर्टल, वीडियो समाचार, ई-पेपर और सोशल मीडिया के माध्यम से सबसे तेज कवरेज।</li>
        </ul>

        <div className="bg-red-50 dark:bg-red-950/40 p-5 rounded-xl border border-red-200 dark:border-red-800 text-xs text-gray-800 dark:text-gray-200 mt-6">
          <strong className="text-red-700 dark:text-red-400 block mb-1">संपादकीय कार्यालय:</strong>
          स्टार न्यूज़ नेटवर्क, सिविल लाइन्स, सतना / पन्ना, मध्य प्रदेश - 485001<br />
          ईमेल: contact@starnewsnetworks.com | हेल्पलाइन: +91 98710 14353
        </div>
      </div>
    </div>
  );
}
