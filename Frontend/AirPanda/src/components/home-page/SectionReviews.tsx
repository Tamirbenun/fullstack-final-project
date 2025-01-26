import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const reviews = [
  {
    img: "https://i.postimg.cc/R0YPDKR3/Emily-Johnson.jpg",
    name: "Emily Johnson",
    review:
      "I had a wonderful time flying with AirPanda! The service was excellent, and the plane was clean and well-maintained. I felt taken care of from start to finish.",
  },
  {
    img: "https://i.postimg.cc/m2SmG0jW/William-Taylor.jpg",
    name: "William Taylor",
    review:
      "I travel often, but the service and atmosphere with AirPanda were the best I’ve ever had. I highly recommend them to anyone looking for a pleasant flight.",
  },
  {
    img: "https://i.postimg.cc/MGHP5dy2/Emma-Thomas.jpg",
    name: "Emma Thomas",
    review:
      "Words can’t describe how great the experience was with AirPanda. The crew was skilled and cheerful, the plane was clean and comfy, and I felt well cared for.",
  },
  {
    img: "https://i.postimg.cc/zXNx6Jnk/Sophia-Anderson.jpg",
    name: "Sophia Ander",
    review:
      "Flying with AirPanda was an incredible experience! The food was tasty and the crew was pleasant and helpful. I’ll be flying with them again!",
  },
  {
    img: "https://i.postimg.cc/t4XmZXJg/James-Anderson.jpg",
    name: "James Ander",
    review:
      "AirPanda went above and beyond my expectations. Everything was smooth and organized, and I could feel the high level of professionalism. I highly recommend them.",
  },
  {
    img: "https://i.postimg.cc/j2HZ29rN/MiaWong.jpg",
    name: "Mia Wong",
    review:
      "AirPanda is the perfect airline for any trip. The pricing was fair, and the overall experience was more than I expected. Thanks for making me feel at home!",
  },
  {
    img: "https://i.postimg.cc/sgwH5tG4/David-Wilson.jpg",
    name: "David Wilson",
    review:
      "This was my first time flying with AirPanda, and I was blown away! Excellent customer service, and the flight was smooth and enjoyable. Highly recommend.",
  },
  {
    img: "https://i.postimg.cc/1RwWvgNt/Olivia-Davis.jpg",
    name: "Olivia Davis",
    review:
      "I wouldn’t fly with any other airline but AirPanda. The crew made me feel safe and pampered, and the flight was seamless. Truly a great experience!",
  },
  {
    img: "https://i.postimg.cc/L5KxHSG2/John-Smith.jpg",
    name: "John Smith",
    review:
      "Flying with AirPanda was an amazing experience! The crew was professional and friendly, and the flight was very comfortable. I’ll definitely fly with them again.",
  },
];

const SectionReviews = () => {
  const [reviewsGroup, setReviewsGroup] = useState<typeof reviews>([]);
  const [groupNumber, setGroupNumber] = useState<number>(1);
  const [review, setReview] = useState<{
    img: string;
    name: string;
    review: string;
  } | null>(reviews[0]);
  const [reviewNumber, setReviewNumber] = useState<number>(0);
  const [disableBtn, setDesableBtn] = useState<string>("back");

  useEffect(() => {
    setReviewsGroup(reviews.slice(0, 3));
  }, []);

  const handleReviewsGroup = (group) => {
    if (group === 1) {
      setGroupNumber(1);
      setReviewsGroup(reviews.slice(0, 3));
    } else if (group === 2) {
      setGroupNumber(2);
      setReviewsGroup(reviews.slice(3, 6));
    } else if (group === 3) {
      setGroupNumber(3);
      setReviewsGroup(reviews.slice(6));
    }
  };

  const handleReview = (direction: string) => {
    if (direction === "Next" && reviewNumber === reviews.length - 1) {
      return;
    } else if (direction === "back" && reviewNumber <= 0) {
      return;
    }

    setReviewNumber((prevReviewNumber) => {
      let newReviewNumber = prevReviewNumber;

      if (direction === "next" && prevReviewNumber < reviews.length - 1) {
        newReviewNumber = prevReviewNumber + 1;
      } else if (direction === "back" && prevReviewNumber > 0) {
        newReviewNumber = prevReviewNumber - 1;
      }

      setReview(reviews[newReviewNumber]);

      if (newReviewNumber === reviews.length - 1) {
        setDesableBtn("next");
      } else if (newReviewNumber === 0) {
        setDesableBtn("back");
      } else {
        setDesableBtn("");
      }
      return newReviewNumber;
    });
  };

  return (
    <div>
      <h2 className="text-4xl sm:text-5xl font-medium text-center mb-10">
        What our <br className="md:hidden" /> Traveler says
      </h2>

      <div className="hidden lg:block">
        <div className="flex justify-center">
          {reviewsGroup.map((r, index) => (
            <div
              key={r.name}
              className="m-8 w-[300px] opacity-0 animate-fadeIn"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationFillMode: "forwards",
                willChange: "opacity, transform",
              }}
            >
              <div className="bg-gray-100 h-[250px] p-5 rounded-t-3xl rounded-br-3xl">
                <FaQuoteRight className="text-gray-300 text-3xl" />
                <p className="mt-3 text-base text-justify">{r.review}</p>
              </div>
              <div className="flex w-full">
                <div className="bg-gray-100 w-[130px] rounded-b-3xl"></div>

                <div className="bg-gray-100 w-full rounded-e-3xl rounded-bl-3xl">
                  <div className="flex items-center">
                    <div className="flex items-center w-full bg-white rounded-3xl py-5 px-15">
                      <img
                        src={r.img}
                        alt="image profile review"
                        className="bg-gray-200 h-[40px] w-[40px] rounded-full me-2 ms-3"
                      />
                      <p className="text-base">{r.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <button
            className={`rounded-full px-3 py-1 bg-gray-200 hover:bg-gray-400 ${
              groupNumber === 1 && "bg-gray-500"
            }`}
            onClick={() => handleReviewsGroup(1)}
          ></button>
          <button
            className={`rounded-full px-3 py-1 bg-gray-200 hover:bg-gray-400 ${
              groupNumber === 2 && "bg-gray-500"
            }`}
            onClick={() => handleReviewsGroup(2)}
          ></button>
          <button
            className={`rounded-full px-3 py-1 bg-gray-200 hover:bg-gray-400 focus:underline-offset-0 ${
              groupNumber === 3 && "bg-gray-500"
            }`}
            onClick={() => handleReviewsGroup(3)}
          ></button>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex justify-center">
          <div
            key={review.name}
            className="mt-8 mx-5 opacity-0 animate-fadeIn"
            style={{
              animationDelay: `${0.2}s`,
              animationFillMode: "forwards",
              willChange: "opacity, transform",
            }}
          >
            <div className="bg-gray-100 h-[230px] p-5 rounded-t-3xl rounded-br-3xl">
              <FaQuoteRight className="text-gray-300 text-3xl" />
              <p className="mt-3 text-base text-justify">{review.review}</p>
            </div>
            <div className="flex w-full">
              <div className="bg-gray-100 w-[130px] rounded-b-3xl"></div>

              <div className="bg-gray-100 w-full rounded-e-3xl rounded-bl-3xl">
                <div className="flex items-center">
                  <div className="flex items-center w-full bg-white rounded-3xl py-5 px-15">
                    <img
                      src={review.img}
                      alt="image profile review"
                      className="bg-gray-200 h-[40px] w-[40px] rounded-full me-2 ms-3"
                    />
                    <p className="text-base">{review.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            className="m-3 p-2 bg-gray-100 rounded-full w-[35px] h-[35px]"
            onClick={() => handleReview("back")}
          >
            <MdArrowBackIos
              className={`ms-1 ${disableBtn === "back" && "text-gray-300"}`}
            />
          </button>
          <button
            className="m-3 p-2 bg-gray-100 rounded-full w-[35px] h-[35px]"
            onClick={() => handleReview("next")}
          >
            <MdArrowForwardIos
              className={`ms-0.5 ${disableBtn === "next" && "text-gray-300"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionReviews;
