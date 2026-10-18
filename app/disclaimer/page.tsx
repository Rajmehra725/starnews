import SectionHeader from "../components/SectionHeader";

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      <SectionHeader title="अस्वीकरण (Disclaimer)" badge="DISCLAIMER" />

      <p className="text-xs text-gray-400">अंतिम अद्यतन: अक्टूबर 2026</p>

      <p>
        स्टार न्यूज़ नेटवर्क (Star News Network) पर दी गई सभी सूचनाएं और समाचार सद्भावनापूर्वक और केवल सामान्य जानकारी के उद्देश्य से प्रकाशित किए जाते हैं।
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        1. सटीकता और दायित्व
      </h3>
      <p>
        हम सामग्री की पूर्णता, विश्वसनीयता और सटीकता बनाए रखने का हर संभव प्रयास करते हैं। फिर भी, किसी भी अनजाने मुद्रण दोष या तीसरे पक्ष के बयानों के लिए पोर्टल किसी कानूनी दायित्व के अधीन नहीं होगा।
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        2. बाहरी लिंक्स
      </h3>
      <p>
        हमारी वेबसाइट पर बाहरी वेबसाइटों के हाइपरलिंक्स हो सकते हैं। हम ऐसी बाहरी साइटों की सामग्री या गोपनीयता प्रथाओं पर कोई नियंत्रण नहीं रखते हैं।
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        3. राय और विचार
      </h3>
      <p>
        स्तंभकारों, नागरिक संवाददाताओं या पाठकों की टिप्पणियों में व्यक्त विचार उनके अपने हैं और वे आवश्यक रूप से स्टार न्यूज़ नेटवर्क के संपादकीय दृष्टिकोण का प्रतिनिधित्व नहीं करते हैं।
      </p>
    </div>
  );
}
