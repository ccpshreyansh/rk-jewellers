
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const points = [
  'पारंपरिक ज्वेलरी डिज़ाइन',
  'कस्टमाइज़ेशन – आपके लिए ख़ास गहने',
  '100% हॉलमार्क गारंटी',
  '25+ सालों का भरोसा',
  'Buxar का सबसे विश्वसनीय ज्वेलर्स',
];

const ChooseUsSection = () => {
  return (
    <section className="bg-[#F0EAD6] py-8 px-6 sm:px-12"
    style={{
                // backgroundImage: `url('/assets/desginbg.png')`,
              }}>
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-4xl font-bold mb-6"
          style={{
            color: '#580F09',
            fontFamily: `'Playfair Display', serif`,
          }}
        >
         Why Families Trust RK Jewellers{' '}
          <span
            className="block text-xl text-gray-700 mt-2"
            style={{ fontFamily: `'Noto Sans Devanagari', sans-serif` }}
          >
            (Our Promise to You)
          </span>
        </motion.h2>

        {/* Points */}
        <ul className="mt-6 space-y-3 text-left max-w-3xl mx-auto">
          {points.map((point, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.2 }}
              className="flex items-start text-lg sm:text-xl text-gray-800"
              style={{ fontFamily: `'Noto Sans Devanagari', sans-serif` }}
            >
              <FaCheckCircle className="text-[#580F09] mt-1 mr-3 flex-shrink-0 text-xl" />
              <span className="leading-snug">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ChooseUsSection;
