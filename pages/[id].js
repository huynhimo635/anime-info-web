import { useRouter } from "next/router";

const DetailAnime = () => {
  const router = useRouter();
  const { id } = router.query;
  return <h1 className="anime-detail">HEllo {id}</h1>;
};

export default DetailAnime;
