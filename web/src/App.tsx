import MortgageCalculator from "./pages/mortgage-calculator";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Mortgage Calculator
        </h1>
        <p className="mb-8 text-gray-600">
          Calculate your mortgage payments based on your property price, down
          payment, interest rate, and payment schedule.
        </p>
        <MortgageCalculator />
      </div>
    </main>
  );
}
