import Isracard from "../../assets/images/paymentsLogos/Isracard.svg";
import American from "../../assets/images/paymentsLogos/american.svg";
import PayPal from "../../assets/images/paymentsLogos/PayPal.svg";
import Visa from "../../assets/images/paymentsLogos/visa.svg";
import MasterCard from "../../assets/images/paymentsLogos/mastercard.svg";

const SectionPayments = () => {
  return (
    <div className="bg-gray-100 md:rounded-3xl p-10 md:p-20 text-center">
      <h3 className="text-5xl text-black/70 mb-5 font-medium">Payment</h3>
      <p>
        Choose your preferred payment method with ease! We accept all major
        credit cards, including Visa, MasterCard, and American Express. You can
        also pay using PayPal. Your payment details are always safe with us,
        ensuring a smooth and worry-free checkout experience.
      </p>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-10 opacity-30 mt-5 items-center max-w-[1000px]">
          <img
            src={MasterCard}
            alt="MasterCard"
            aria-label="MasterCard Logo"
            className="h-[60px] md:h-[90px]"
          />
          <img
            src={American}
            alt="American"
            aria-label="American Logo"
            className="h-[70px] md:h-[100px]"
          />
          <img
            src={Visa}
            alt="Visa"
            aria-label="Visa Logo"
            className="h-[70px]"
          />
          <img
            src={Isracard}
            alt="Isracard"
            aria-label="Isracard Logo"
            className="h-[100px]"
          />
          <img
            src={PayPal}
            alt="PayPal"
            aria-label="PayPal Logo"
            className="h-[70px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionPayments;
