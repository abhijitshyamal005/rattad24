import Link from 'next/link';

const Page = () => {
  return (
    <div className="p-4 bg-[#111111]">
      <div className="mb-4">
        <h1 className="text-white mb-4 text-4xl">Buttons and Links</h1>

        <div className="flex flex-col gap-2">
          <button type="button" className="button button-lg button-primary">
            Gain Early Access
          </button>
          <button type="button" className="button button-lg button-secondary">
            Choose a plan
          </button>
          <button type="button" className="button button-lg button-danger">
            Contact us
          </button>
          <div
            role="link"
            className="button button-as-link button-primary button-lg p-[1px]"
          >
            <Link
              href="/"
              className="inline-flex justify-center h-full w-full bg-[#111111] rounded-[2500rem] p-4"
            >
              Contact Support
            </Link>
          </div>
          <button
            role="link"
            className="button button-as-link button-primary button-sm icon-only p-[1px]"
          >
            <div className="flex min-h-[2.5rem] w-full items-center justify-center bg-[#111111] rounded-[2500rem] p-1">
              +
            </div>
          </button>
        </div>
      </div>

      <div>
        <h1 className="mb-4 text-white text-4xl">Title</h1>
        <div>
          <h1 className="bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent">
            simplecx
          </h1>
        </div>
      </div>

      <div>
        <h1 className="text-white mb-4 text-4xl">Cards</h1>
        <div className="pl-[30px]">
          <div className="w-full overflow-auto">
            <div className="w-[145%] flex gap-4 overflow-auto">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="snap-x">
                  <div className="relative w-full">
                    <figure className="aspect-video w-full overflow-hidden relative">
                      <div className="absolute inset-0 h-full">
                        <img
                          src="/benefit_1.png"
                          className="block object-cover opacity-100 w-full h-full absolute inset-0 rounded-tr-2xl rounded-tl-2xl"
                        />
                      </div>
                    </figure>
                  </div>
                  <div className="bg-[#121212] rounded-bl-2xl rounded-br-2xl">
                    <div className="p-4">
                      <h4 className="font-moranga text-[22px] font-normal leading-[32.25px] text-white">
                        Small and Medium Enterprises (SMES)
                      </h4>
                      <div className="mt-2">
                        <div className="text-white font-inter text-sm leading-[16.94px] font-[200]">
                          Run the show- let simplecx handle your content. We
                          save you time, simplify your marketing process, and
                          help you create high-quality content that boosts
                          sales, engages customers, and keeps your brand
                          consistent- all without needing advanced tech skills.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
