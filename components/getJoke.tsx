import flashStyle from "../styles/index.module.scss";

const GetJoke = ({ jokes, id }) => {
  let knock: string = "";
  let who: string = "";
  const joke = jokes[id];

  knock = joke["who's-there"];
  who = joke["who"];
  return (
    <>
      <div className={flashStyle.req}>
        <h1 className={flashStyle.center}>{knock}</h1>
      </div>
      <div className={flashStyle.res}>
        <h1 className={flashStyle.center}>{knock} who?</h1>
      </div>
      <div className={flashStyle.star}>
        <h1 className={flashStyle.center}>{who}</h1>
      </div>
    </>
  );
};

export default GetJoke;