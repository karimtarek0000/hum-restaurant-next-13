import ResturanNavbar from "@/components/ResturanNavbar";
import { RestaurantSlug } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getRestaurant = async (slug: string): Promise<RestaurantSlug> => {
  const data = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
    },
  });

  return data as RestaurantSlug;
};

type props = {
  params: { slug: string };
};

async function ResturantDetails({ params }: props) {
  const { name, slug, description, images } = await getRestaurant(params.slug);

  const allImages = images.map((img) => (
    <img key={img} className="w-56 h-44 mr-1 mb-1" src={img} alt={name} />
  ));

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        {/* RESAURANT NAVBAR */}
        <ResturanNavbar slug={slug} />
        {/* RESAURANT NAVBAR */} {/* TITLE */}
        <div className="mt-4 border-b pb-6">
          <h1 className="font-bold text-6xl">{name}</h1>
        </div>
        {/* TITLE */} {/* RATING */}
        <div className="flex items-end">
          <div className="ratings mt-2 flex items-center">
            <p>*****</p>
            <p className="text-reg ml-3">4.9</p>
          </div>
          <div>
            <p className="text-reg ml-4">600 Reviews</p>
          </div>
        </div>
        {/* RATING */} {/* DESCRIPTION */}
        <div className="mt-4">
          <p className="text-lg font-light">{description}</p>
        </div>
        {/* DESCRIPTION */} {/* IMAGES */}
        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
            {images.length} photo{images.length > 1 ? "s" : ""}
          </h1>
          <div className="flex flex-wrap">{allImages}</div>
        </div>
        {/* IMAGES */} {/* REVIEWS */}
        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
            What 100 people are saying
          </h1>
          <div>
            {/* REVIEW CARD */}
            <div className="border-b pb-7 mb-7">
              <div className="flex">
                <div className="w-1/6 flex flex-col items-center">
                  <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                    <h2 className="text-white text-2xl">MJ</h2>
                  </div>
                  <p className="text-center">Micheal Jordan</p>
                </div>
                <div className="ml-10 w-5/6">
                  <div className="flex items-center">
                    <div className="flex mr-5">*****</div>
                  </div>
                  <div className="mt-5">
                    <p className="text-lg font-light">
                      Laurie was on top of everything! Slow night due to the
                      snow storm so it worked in our favor to have more one on
                      one with the staff. Delicious and well worth the money.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* REVIEW CARD */}
          </div>
        </div>
        {/* REVIEWS */}
      </div>
      <div className="w-[27%] relative text-reg">
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light" id="">
              <option value="">1 person</option>
              <option value="">2 people</option>
            </select>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Date</label>
              <input type="text" className="py-3 border-b font-light w-28" />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Time</label>
              <select name="" id="" className="py-3 border-b font-light">
                <option value="">7:30 AM</option>
                <option value="">9:30 AM</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
              Find a Time
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResturantDetails;
