import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from "../utils/trpc";


interface GameProps {

}

const Game: React.FC<GameProps> = ({  }) => {
  const router = useRouter();
  const category = router.query?.category;

  if (typeof category !== "string") return <div>invalid</div>

  const resp = trpc.useQuery(["get_options", { category }]);

  if (!resp.data) return <div>Invalid</div>

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
