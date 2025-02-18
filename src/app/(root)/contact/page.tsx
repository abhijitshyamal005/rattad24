function Page() {
  return (
    <section>
      <div className="max-w-[1440px] mx-auto h-screen">
        <div className="py-20 px-4">
          <h1 className="text-4xl sm:text-5xl font-moranga mb-6 text-center">
            <span className="bg-gradient-to-r from-[#EA0022] to-[#754DE8] text-transparent bg-clip-text">
              Contact Us
            </span>
          </h1>
          <p className="text-gray-300 font-light text-center text-base sm:text-lg max-w-5xl mx-auto mb-12">
            We’re here to help you create, refine, and elevate your content.
            Whether you have questions, need support, or just want to learn more
            about how simplecx can transform your content creation process, we’d
            love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-left">
            <div className="mb-8 sm:mb-0">
              <h2 className="text-2xl font-moranga mb-4 text-white">
                Reach Us Directly
              </h2>
              <p className="mb-2 text-white">
                Email:{' '}
                <span className="text-gray-300 font-light">
                  support@retinkmedia.com
                </span>
              </p>
              <p className="text-white">
                WhatsApp:{' '}
                <span className="text-gray-300 font-light">
                  +44 951 291 254165
                </span>
              </p>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-moranga mb-4 text-white">
                Connect With Us Online
              </h2>
              <p className="mb-2 text-white">
                Website:{' '}
                <a
                  href="https://retink.io"
                  className="text-gray-300 font-light underline hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.simplecx.retink.io
                </a>
              </p>
              <p className="text-white">
                Live Chat:{' '}
                <span className="text-gray-300 font-light">
                  Available on our website during support hours
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
