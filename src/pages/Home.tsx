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
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        Recipe & Meal Planner
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Plan meals, track nutrition, and generate shopping lists easily.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/recipes"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Browse Recipes
        </Link>
        <Link
          to="/planner"
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          Meal Planner
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;
