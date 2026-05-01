export function HeroSection() {
  return (
    <section className="relative w-full h-[500px] overflow-hidden rounded-3xl my-8 mx-auto max-w-[95%] lg:max-w-[1200px]">
      <div className="absolute inset-0 bg-linear-to-br from-violet-500/20 via-indigo-500/10 to-transparent"></div>
      <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-300 text-xs font-medium border border-violet-200 dark:border-violet-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          RentPi is in active development
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mb-4">
          Rent Anything, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-500">
            Anywhere.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          A placeholder for the beautiful hero graphic that will draw users in. 
          Discover a world of possibilities right at your fingertips.
        </p>
      </div>
    </section>
  )
}
