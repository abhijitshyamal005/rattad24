import { Form } from "./Form";

const EarlyAccessForm = () => {
  return (
    <section id="early-access" className="mb-20"> 
      <div className="text-white flex flex-col items-center justify-center px-4">
        {/* Heading */}
        <div className="text-center mb-8 font-moranga">
          <h1 className="text-2xl md:text-4xl">
            Join 1000s of Businesses and Creators already signed up
          </h1>
          <h1 className="text-2xl md:text-4xl">
            with{" "}
            <span className="bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent">
              simplecx
            </span>{" "}
            . Transform your content game today.
          </h1>
        </div>
        {/* Form Container */}
        <div className="p-6 md:p-10 rounded-lg shadow-lg max-w-xl w-full">
          <h2 className="text-3xl md:text-2xl font-semibold text-center mb-4">
            Gain Early Access
          </h2>
          {/* Updated Paragraph Section */}
          <div className="mb-6">
            <p className="text-center text-sm md:text-sm max-w-md mx-auto">
              A place that combines the best of AI and Human assistance in
              creating all forms of great content
            </p>
            <p className="text-center text-xs md:text-xs font-light mt-5">
              Sign up to join our waitlist and receive early bird discount.
            </p>
          </div>
          {/* Form */}
          <Form />
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessForm;
