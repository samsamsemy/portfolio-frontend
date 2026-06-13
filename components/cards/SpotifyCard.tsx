"use client";

type SpotifyCardProps = {
  title: string;
  spotifyUrl: string;
  className?: string;
};

type SpotifyType = "track" | "playlist" | "album" | "artist" | "show" | "episode";

type SpotifyPlayable = {
  title: string;
  embedUrl: string;
  height: number;
};

const SPOTIFY_TYPES = new Set<SpotifyType>([
  "track",
  "playlist",
  "album",
  "artist",
  "show",
  "episode",
]);

function parseSpotifyUrl(title: string, spotifyUrl: string): SpotifyPlayable | null {
  try {
    const url = new URL(spotifyUrl);
    const isSpotifyHost = url.hostname === "open.spotify.com" || url.hostname.endsWith(".open.spotify.com");

    if (!isSpotifyHost) {
      return null;
    }

    const pathParts = url.pathname.split("/").filter(Boolean);
    const normalizedParts = pathParts[0]?.startsWith("intl-") ? pathParts.slice(1) : pathParts;
    const type = normalizedParts[0] as SpotifyType | undefined;
    const id = normalizedParts[1];

    if (!type || !SPOTIFY_TYPES.has(type) || !id || !/^[A-Za-z0-9]+$/.test(id)) {
      return null;
    }

    const isPlaylist = type === "playlist";
    const params = new URLSearchParams({
      theme: "0",
    });

    return {
      title: title.trim() || "Spotify Preview",
      embedUrl: `https://open.spotify.com/embed/${type}/${id}?${params.toString()}`,
      height: isPlaylist ? 180 : 80,
    };
  } catch {
    return null;
  }
}

export function SpotifyCard({ title, spotifyUrl, className = "" }: SpotifyCardProps) {
  const selectedItem = parseSpotifyUrl(title, spotifyUrl);

  const displayTitle = selectedItem?.title ?? (title.trim() || "Spotify Preview");

  return (
    <aside
      aria-label={`Spotify preview: ${displayTitle}`}
      className={`technical-card w-full overflow-hidden p-2 ${className}`}
    >
      <div className="mb-1.5 flex items-center justify-between gap-3 border-b border-line pb-1.5">
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-semibold uppercase text-subtle">Signal Audio</p>
          <h2 className="truncate font-display text-sm uppercase tracking-normal text-gold-soft">
            {displayTitle}
          </h2>
        </div>
        <span className="shrink-0 border border-line px-2 py-1 font-mono text-[10px] uppercase text-muted">
          Spotify
        </span>
      </div>

      {selectedItem ? (
        <div className="overflow-hidden bg-card-raised">
          <iframe
            title={`Spotify embed for ${displayTitle}`}
            src={selectedItem.embedUrl}
            width="100%"
            height={selectedItem.height}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block w-full max-w-full border-0"
          />
        </div>
      ) : (
        <div className="border border-line bg-card-raised p-4 font-mono text-xs uppercase leading-relaxed text-danger">
          Spotify URL tidak valid. Gunakan link dari open.spotify.com untuk track, playlist, album,
          artist, show, atau episode.
        </div>
      )}
    </aside>
  );
}
