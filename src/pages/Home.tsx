import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center px-4 text-center bg-gradient-to-br from-neutral-950 to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-6xl font-extrabold google-sans-code text-white
       tracking-tight leading-snug mb-4">
        Recipe & Meal Planner
      </h1>
      <p className="text-base md:text-xl text-gray-300 max-w-xl font-medium mb-10 google-sans-code">
        Plan your meals, generate shopping lists, and track nutrition — all in one beautiful app.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/recipes"
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg google-sans-code"
        >
          🍽 Browse Recipes
        </Link>
        <Link
          to="/planner"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg google-sans-code"
        >
          🗓 Meal Planner
        </Link>
        <Link
          to="/shopping-list"
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg google-sans-code"
        >
          🛒 Shopping List
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;
