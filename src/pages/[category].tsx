import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { inferQueryResponse } from './api/trpc/[trpc]';
import { trpc } from "../utils/trpc";


type Option = inferQueryResponse<"get-option">;

const Game: React.FC = () => {
  const [prev, setPrev] = useState<Option>();
  const [curr, setCurr] = useState<Option>();
  const [inTransition, setInTransition] = useState(false);

  const router = useRouter();
  const category = router.query?.category as string;

  const { data: initialData } = trpc.useQuery(
    ["get-category-info", { category }],
    { refetchOnWindowFocus: false },
  );
  const { data: next, refetch, isLoading } = trpc.useQuery(
    ["get-option", { category, excludeId: curr?.id }],
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!initialData) return;
    setPrev(initialData.prev);
    setCurr(initialData.curr);
  }, [initialData]);

  if (router.isReady === false) return <Loader />;
  if (isLoading || !initialData) return <Loader />;
  const { pretext, posttext } = initialData;

  // return <Loader />
  const updateOptions = () => {
    setPrev(curr);
    setCurr(next);
    refetch();
  }

  if (!prev || !curr || !next) return <Loader />;

  return (
    <>
      <div className="flex flex-row h-screen w-screen relative overflow-hidden">
        <PrevGameOption optionData={prev} pretext={pretext} posttext={posttext} index={0} inTransition={inTransition}/>
        <CurrGameOption optionData={curr} pretext={pretext} posttext={posttext} index={1} inTransition={inTransition}/>
        <NextGameOption optionData={next} pretext={pretext} posttext={posttext} index={2} inTransition={inTransition}/>
        <Versus onClick={() => {setInTransition(true)}}/>
        {/* <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500" onClick={() => {setInTransition(true)}}>hi</button> */}
      </div>
    </>
  );
}


const PrevGameOption: React.FC<{
  optionData: Option,
  pretext: string,
  posttext: string | null,
  index: number,
  inTransition: boolean,
}> = ({ optionData, pretext, posttext, index, inTransition }) => {
  return (
    <div
      className="absolute top-0 left-0 w-1/2 bg-contain bg-no-repeat bg-center duration-1000"
      style={{
        backgroundImage: `url(${optionData.img})`,
        backgroundColor: index % 2 ? "lightblue" : "orange",
        transform: inTransition ? "translateX(-50vw)" : undefined,
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-center font-mono bg-black/40 text-white p-4">
          <div className="text-6xl mb-1">{optionData.title}</div>
          <div className="text-2xl mb-1">{pretext}</div>
          <div className="text-6xl">{optionData.value.toLocaleString()}</div>
          {posttext ?? <div className="text-2xl mb-1">{posttext}</div>}
        </div>
      </div>
    </div>
   );
}


const CurrGameOption: React.FC<{
  optionData: Option,
  pretext: string,
  posttext: string | null,
  index: number,
  inTransition: boolean,
}> = ({ optionData, pretext, posttext, index, inTransition }) => {
  return (
    <div
      className="absolute top-0 left-1/2 w-1/2 bg-contain bg-no-repeat bg-center duration-1000"
      style={{
        backgroundImage: `url(${optionData.img})`,
        backgroundColor: index % 2 ? "lightblue" : "orange",
        transform: inTransition ? "translateX(-50vw)" : undefined,
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-center font-mono bg-black/40 text-white p-4">
          <div className="text-6xl mb-1">{optionData.title}</div>
          <div className="text-2xl mb-1">{pretext}</div>
          <div className="text-6xl">{optionData.value.toLocaleString()}</div>
          {posttext ?? <div className="text-2xl mb-1">{posttext}</div>}
        </div>
      </div>
    </div>
   );
}


const NextGameOption: React.FC<{
  optionData: Option,
  pretext: string,
  posttext: string | null,
  index: number,
  inTransition: boolean,
}> = ({ optionData, pretext, posttext, index, inTransition }) => {
  return (
    <div
      className="absolute top-0 left-full w-1/2 bg-contain bg-no-repeat bg-center duration-1000"
      style={{
        backgroundImage: `url(${optionData.img})`,
        backgroundColor: index % 2 ? "lightblue" : "orange",
        transform: inTransition ? "translateX(-50vw)" : undefined,
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-center font-mono bg-black/40 text-white p-4">
          <div className="text-6xl mb-1">{optionData.title}</div>
          <div className="text-2xl mb-1">{pretext}</div>
          <div className="text-6xl">{optionData.value.toLocaleString()}</div>
          {posttext ?? <div className="text-2xl mb-1">{posttext}</div>}
        </div>
      </div>
    </div>
   );
}


const Versus: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div
    className="pointer flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 rounded-full w-12 h-12 justify-center items-center"
    onClick={onClick}
  >
    VS
  </div>
)


const Loader: React.FC = () => (
  <div className="lds-ripple scale-200 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div></div><div></div>
  </div>
)

export default Game;
