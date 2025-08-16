import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex justify-center items-center min-h-screen max-w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Light warm overlay */}
      <div className="absolute inset-0 bg-yellow-50 bg-opacity-70"></div>

      <div className="relative z-10 text-center px-6 max-w-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-700 drop-shadow-md animate-pulse">
          Welcome to <span className="text-red-500">FoodExpress</span> 🍔
        </h1>
        <p className="mt-4 text-lg md:text-xl text-yellow-900 drop-shadow-md">
          Delicious meals delivered fast at your doorstep. Fresh, tasty, and always hot!
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-8 px-8 py-3 bg-red-500 text-white font-semibold rounded shadow-lg hover:bg-red-600 transition"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Home;
