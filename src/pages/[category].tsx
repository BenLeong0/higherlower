import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { inferQueryResponse } from './api/trpc/[trpc]';
import { trpc } from "../utils/trpc";
import getOptions from '../server/categories/countries';


type OptionInfo = inferQueryResponse<"get_options">;
type GameOptionData = ReturnType<typeof getOption>;

const Game: React.FC = () => {
  const router = useRouter();
  if (router.isReady === false) return <Loader />;

  const category = router.query.category as string;
  const resp = trpc.useQuery(["get_options", { category }]);

  if (!resp.data) return <div>Invalid category</div>

  const [option1, setOption1] = useState<GameOptionData>(getOption(resp.data));
  const [option2, setOption2] = useState<GameOptionData>(getOption(resp.data, option1.id));

  const getNewOptions = () => {
    setOption1(option2);
    setOption2(getOption(resp.data, option2.id));
  }

  return (
    <>
      <div className="flex flex-row">
        <GameOption optionData={option1} pretext={resp.data.pretext} posttext={resp.data.posttext} index={0}/>
        <GameOption optionData={option2} pretext={resp.data.pretext} posttext={resp.data.posttext} index={1}/>
      </div>
      <button onClick={getNewOptions}>HII</button>
    </>
  );
}


const GameOption: React.FC<{
  optionData: GameOptionData,
  pretext: string,
  posttext: string | null,
  index: number }> = ({ optionData, pretext, posttext, index }) => {
  return (
    <div
      className="w-1/2 h-screen bg-contain bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${optionData.img})`,
        backgroundColor: index === 0 ? "lightblue" : "orange"
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-center font-mono bg-gradient-to-r from-orange-200/50 via-white/50 to-orange-200/50 p-4">
          <div className="text-6xl mb-1">{optionData.title}</div>
          <div className="text-2xl mb-1">{pretext}</div>
          <div className="text-6xl">{optionData.value.toLocaleString()}</div>
          {posttext ?? <div className="text-2xl mb-1">{posttext}</div>}
        </div>
      </div>
    </div>
   );
}


const Loader: React.FC = () => (
  <div className="lds-ripple scale-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div></div><div></div>
  </div>
)

const getOption = (optionInfo: OptionInfo, excludeId?: string) => {
  const options = optionInfo.options;
  if (!excludeId) return getRandomElement(options);
  return getRandomElement(options.filter(option => option.id != excludeId));
}

function getRandomElement<T>(arr: T[]): T {
  const el = arr[Math.floor(Math.random() * arr.length)];
  if (typeof el === "undefined") throw Error("Empty array!");
  return el;
}

export default Game;
