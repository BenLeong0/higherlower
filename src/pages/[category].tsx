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

export default Game;
