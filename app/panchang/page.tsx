"use client";

export default function AstroWeatherSection() {
  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-6">
          <div className="border-l-4 border-blue-500 pl-3">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              राशिफल और पंचांग & मौसम
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* राशिफल */}
          <div className="bg-white rounded-xl shadow p-3">
            <div className="h-[300px] w-full">
              <iframe
                src="https://piushtrivedi.neocities.org/hindi_astrology_google_gadget_part_1_updated_html2.html"
                className="w-full h-full rounded"
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>

          {/* पंचांग */}
          <div className="bg-white rounded-xl shadow p-3">
            <div className="h-[300px] w-full">
              <iframe
                src="https://www.igoogleportal.com/shindig/gadgets/ifr?url=http://hosting.gmodules.com/ig/gadgets/file/109787730588197067267/hindi_panchang.xml&lang=en&country=ALL"
                className="w-full h-full rounded"
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>

          {/* मौसम */}
          <div className="bg-white rounded-xl shadow p-3">
            <div className="h-[318px] w-full flex justify-center items-center">
              <iframe
                src="https://api.wo-cloud.com/content/widget/?geoObjectKey=16143051&language=en&region=IN&timeFormat=HH:mm&windUnit=kmh&systemOfMeasurement=metric&temperatureUnit=celsius"
                className="w-full max-w-[290px] h-full rounded-lg border border-blue-700"
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}