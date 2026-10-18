import SectionHeader from "../components/SectionHeader";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      <SectionHeader title="नियम एवं शर्तें (Terms & Conditions)" badge="TERMS" />

      <p className="text-xs text-gray-400">अंतिम अद्यतन: अक्टूबर 2026</p>

      <p>
        स्टार न्यूज़ नेटवर्क (Star News Network) पोर्टल का उपयोग करके आप निम्नलिखित नियमों और शर्तों से बंधे होने के लिए सहमत होते हैं:
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        1. सामग्री का स्वामित्व
      </h3>
      <p>
        इस पोर्टल पर प्रकाशित सभी समाचार, लेख, तस्वीरें, वीडियो और अन्य सामग्रियां स्टार न्यूज़ नेटवर्क की बौद्धिक संपदा हैं या विधिवत अनुमति प्राप्त हैं। पूर्व लिखित अनुमति के बिना इनका व्यावसायिक पुनरुत्पादन प्रतिबंधित है।
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        2. उपयोगकर्ता आचरण
      </h3>
      <p>
        पाठकों द्वारा की जाने वाली टिप्पणियां शिष्ट, संयमित और कानूनी होनी चाहिए। अभद्र भाषा, नफरत फैलाने वाले बयान या भ्रामक जानकारी पोस्ट करने पर टिप्पणी को हटाने और संबंधित उपयोगकर्ता को ब्लॉक करने का अधिकार संपादकीय मंडल के पास सुरक्षित है।
      </p>

      <h3 className="text-base font-bold text-gray-900 dark:text-white pt-2">
        3. नागरिक पत्रकारिता
      </h3>
      <p>
        &lsquo;खबर भेजें&rsquo; अनुभाग के माध्यम से भेजी गई खबरों की सत्यता की जांच के बाद ही उन्हें प्रकाशित किया जाएगा। किसी भी झूठी या मनगढ़ंत खबर के लिए भेजने वाला व्यक्ति स्वयं उत्तरदायी होगा।
      </p>
    </div>
  );
}
