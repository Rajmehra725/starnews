import SectionHeader from "../components/SectionHeader";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      <SectionHeader title="गोपनीयता नीति (Privacy Policy)" badge="LEGAL" />

      <p className="text-xs text-gray-400">अंतिम अद्यतन: 18 अक्टूबर 2026</p>

      <p>
        स्टार न्यूज़ नेटवर्क (Star News Network) पर आपकी गोपनीयता हमारे लिए अत्यंत महत्वपूर्ण है। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट और सेवाओं का उपयोग करते हैं, तो हम आपकी जानकारी को कैसे एकत्रित, उपयोग और सुरक्षित रखते हैं।
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        1. हम कौन सी जानकारी एकत्रित करते हैं?
      </h3>
      <ul className="list-disc pl-5 space-y-1.5 text-xs">
        <li><strong>स्वैच्छिक जानकारी:</strong> जब आप टिप्पणी करते हैं, न्यूज़लेटर सब्सक्राइब करते हैं, खबर भेजते हैं या संपर्क करते हैं, तो आपका नाम, ईमेल और फोन नंबर।</li>
        <li><strong>तकनीकी डेटा:</strong> आपके डिवाइस का प्रकार, ब्राउज़र, आईपी पता, और विज़िट किए गए पृष्ठों का विश्लेषण।</li>
        <li><strong>कुकीज़:</strong> बेहतर उपयोगकर्ता अनुभव और प्राथमिकताओं को सहेजने के लिए कुकीज़ का उपयोग।</li>
      </ul>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        2. जानकारी का उपयोग
      </h3>
      <p>
        हम एकत्रित की गई जानकारी का उपयोग केवल समाचार सेवाएं प्रदान करने, पाठकों की टिप्पणियों का प्रबंधन करने, न्यूज़लेटर भेजने और वेबसाइट के प्रदर्शन को बेहतर बनाने के लिए करते हैं। हम कभी भी आपकी व्यक्तिगत जानकारी को किसी तीसरे पक्ष को नहीं बेचते हैं।
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        3. डेटा सुरक्षा
      </h3>
      <p>
        हम आपके डेटा को अनधिकृत पहुंच या प्रकटीकरण से बचाने के लिए आधुनिक सुरक्षा तकनीकों और एन्क्रिप्शन का उपयोग करते हैं।
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        4. संपर्क सूत्र
      </h3>
      <p>
        गोपनीयता नीति से संबंधित किसी भी प्रश्न के लिए आप हमें contact@starnewsnetworks.com पर ईमेल कर सकते हैं।
      </p>
    </div>
  );
}
