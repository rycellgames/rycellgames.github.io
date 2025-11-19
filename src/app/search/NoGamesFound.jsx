export default function NoGamesFound() {
  return (
    <div className="w-full h-full flex justify-center text-center">
      <div className="max-w-sm mt-10 flex justify-center items-center space-y-5 flex-col">
        <h1>We couldn't find any games according to your search term...</h1>
        <img
          src="/static/images/memes/khaby-lame.gif"
          className="w-15 "
          alt="?"
        />
      </div>
    </div>
  );
}
