import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto text-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold font-serif text-gray-800 tracking-tighter leading-relaxed">
        Recipe & Meal Planner
      </h1>
      <p className="text-lg font-semibold font-serif text-gray-700 tracking-tight leading-tights">
        Plan meals weekly, track nutrition, and create shopping lists easily.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/recipes"
          className="bg-indigo-400 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
        >
          Browse Recipes
        </Link>
        <Link
          to="/planner"
          className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700"
        >
          Meal Planner
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;
