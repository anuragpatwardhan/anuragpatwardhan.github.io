export default function BackgroundFX() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Optional looping video — drop a file at public/videos/bg.mp4 and uncomment the <video> below.
          Tip: get something dark/abstract from pexels.com/videos (smoke, particles, ink). */}
      {/*
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>
      */}

      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 grain" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
    </div>
  );
}
