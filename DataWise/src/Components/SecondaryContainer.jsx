import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Feature1 from "/DataAnalytics.png";
import Feature2 from "/QuerySearch.png";


const featureVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

const buttonVariants = {
  hover: { scale: 1.2, transition: { duration: 0.4 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } }
};

const Features = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className="py-32 bg-gray-100" id="features">
      <div className="container mx-auto my-4">
        <motion.div
          className="flex flex-col space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }} 
        >
          {/* Feature 1 */}
          {/* <motion.div
            className="feature-item flex flex-col md:flex-row items-center justify-between md:space-x-8"
            variants={featureVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={Feature1}
              alt="Feature Image 1"
              className="w-56 h-56 md:mr-4 mb-4 md:mb-0 rounded-lg shadow-lg"
            />
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">Data Analytics</h3>
              <p className="text-gray-700 mb-2">
                Manage data effectively and gain actionable insights with this powerful feature.
              </p>
              <p className="text-gray-500">
                Utilize advanced algorithms to analyze your data and generate comprehensive reports. Visualize trends, track key performance indicators, and make data-driven decisions with ease.
              </p>
            </div>
            <motion.button
              onClick={() => handleNavigate("/feature-1")}
              className="flex items-center bg-black text-white px-6 py-2 font-semibold rounded-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div> */}

          {/* Feature 2 */}
          <motion.div
            className="feature-item flex flex-col md:flex-row items-center justify-between md:space-x-8"
            variants={featureVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={() => handleNavigate("/query-generator")}
              className="flex items-center bg-black text-white px-6 py-2 font-semibold rounded-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaArrowLeft className="mr-2" /> Explore
            </motion.button>
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">AI-Powered Query Generator</h3>
              <p className="text-gray-700 mb-2">
              Transform Data into Decisions with Smart Queries.
              </p>
              <p className="text-gray-500">
              Simplify data analysis with AI-driven queries. Just type your question, and our system delivers accurate, real-time insights to drive informed decisions.

</p>
            </div>
            <img
              src={Feature2}
              alt="Feature Image 2"
              className="w-56 h-56 md:mr-4 mb-4 md:mb-0 rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Feature 3 */}
          {/* <motion.div
            className="feature-item flex flex-col md:flex-row items-center justify-between md:space-x-8"
            variants={featureVariants}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <img
              src={Feature3}
              alt="Feature Image 3"
              className="w-56 h-56 md:mr-4 mb-4 md:mb-0 rounded-lg shadow-lg"
            />
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-semibold mb-4">Visual Analytics</h3>
              <p className="text-gray-700 mb-2">
                Analyze trends and gain insights faster with advanced analytics.
              </p>
              <p className="text-gray-500">
                Transform your data into stunning visual representations. Our analytics tools help you identify patterns, spot opportunities, and communicate insights effectively through interactive dashboards and graphs.
              </p>
            </div>
            <motion.button
              onClick={() => handleNavigate("/feature-3")}
              className="flex items-center bg-black text-white px-6 py-2 font-semibold rounded-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore <FaArrowRight className="ml-2" />
            </motion.button>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
