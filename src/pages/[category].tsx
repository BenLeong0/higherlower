import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from "../utils/trpc";


interface GameProps {

}

const Game: React.FC<GameProps> = ({  }) => {
  const router = useRouter();
  if (router.isReady === false) return <Loader />;

  const category = router.query.category as string;
  const resp = trpc.useQuery(["get_options", { category }]);

  if (!resp.data) return <div>Invalid category</div>

  return (
    <>
      <div className="font-bold">valid: { resp.data.category } </div>
      {
        resp.data.options.map(option => (
          <div>{option.title} {resp.data.pretext} {option.value}</div>
        ))
      }
    </>
  );
}

const Loader: React.FC = () => (
  <div className="lds-ripple scale-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div></div><div></div>
  </div>
)

export default Game;
