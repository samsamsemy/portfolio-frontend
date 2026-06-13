import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import { SpotifyCard } from "@/components/cards/SpotifyCard";
import { Badge } from "@/components/ui/Badge";
import { BlueprintPlaceholder } from "@/components/ui/BlueprintPlaceholder";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { SECTION_LABELS } from "@/lib/constants";
import { compactText } from "@/lib/format";
import { getMediaAlt, getMediaUrl } from "@/lib/strapi";
import type { PortfolioProfile, SpotifyItem } from "@/lib/types";

type HeroSectionProps = {
  profile: PortfolioProfile | null;
};

function getRandomSpotifyItem(items?: SpotifyItem[] | null) {
  const playableItems = (items ?? []).filter(
    (item) => item.spotify_title?.trim() && item.spotify_url?.trim(),
  );

  if (playableItems.length === 0) {
    return null;
  }

  return playableItems[Math.floor(Math.random() * playableItems.length)] ?? playableItems[0];
}

export function HeroSection({ profile }: HeroSectionProps) {
  const profileImageUrl = getMediaUrl(profile?.profileImage);
  const cvUrl = getMediaUrl(profile?.cvFile);

  if (!profile) {
    return (
      <section id="home" className="technical-grid border-b border-line py-20 sm:py-28">
        <Container>
          <EmptyState
            title="Profile content is not published"
            description="Publish Portfolio Profile in Strapi Admin to fill the hero section."
          />
        </Container>
      </section>
    );
  }

  const spotifyItem = getRandomSpotifyItem(profile.spotifyItems);

  return (
    <section
      id="home"
      className="technical-grid relative flex min-h-[calc(100vh-4rem)] overflow-hidden border-b border-line pb-6 pt-0 sm:pb-8 lg:pb-5 lg:pt-0"
    >
      <Container className="flex flex-col justify-center">
        {spotifyItem?.spotify_title && spotifyItem.spotify_url ? (
          <div className="hidden w-full justify-center lg:mb-5 lg:flex">
            <div className="w-full max-w-[420px]">
              <SpotifyCard title={spotifyItem.spotify_title} spotifyUrl={spotifyItem.spotify_url} />
            </div>
          </div>
        ) : null}

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-gold-soft">
              {SECTION_LABELS.hero}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>{profile.isOpenToWork ? "Open to Work" : "Portfolio Online"}</Badge>
              <Badge>{compactText(profile.headline, "Web Development / QA")}</Badge>
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-5xl uppercase leading-none text-foreground sm:text-7xl lg:text-8xl">
              {compactText(profile.name, "Samuel")}
            </h1>
            <p className="mt-5 max-w-3xl font-display text-2xl uppercase leading-tight text-gold-soft sm:text-3xl">
              {compactText(profile.subHeadline, compactText(profile.headline, "Web Developer & QA Enthusiast"))}
            </p>
            <MarkdownRenderer content={profile.shortDescription} className="mt-6 max-w-2xl" />

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#projects">
                View Projects
                <ArrowDown size={15} aria-hidden="true" />
              </Button>
              <Button href={cvUrl} variant="secondary" external>
                Download CV
              </Button>
              {profile.email ? (
                <Button href={`mailto:${profile.email}`} variant="ghost">
                  <Mail size={15} aria-hidden="true" />
                  Contact Me
                </Button>
              ) : null}
            </div>

            {spotifyItem?.spotify_title && spotifyItem.spotify_url ? (
              <SpotifyCard
                title={spotifyItem.spotify_title}
                spotifyUrl={spotifyItem.spotify_url}
                className="mt-4 max-w-xl lg:hidden"
              />
            ) : null}
          </div>

          <div className="hidden lg:block">
            <div className="technical-card relative overflow-hidden p-3">
              {profileImageUrl ? (
                <div className="relative max-h-[calc(100vh-20rem)] min-h-[320px] overflow-hidden border border-line bg-card-raised xl:min-h-[360px]">
                  <Image
                    src={profileImageUrl}
                    alt={getMediaAlt(profile.profileImage, `${compactText(profile.name, "Samuel")} profile photo`)}
                    fill
                    priority
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <BlueprintPlaceholder
                  label={compactText(profile.name, "Profile Photo")}
                  className="max-h-[calc(100vh-20rem)] min-h-[320px] xl:min-h-[360px]"
                />
              )}
              <div className="mt-3 grid grid-cols-2 gap-3 font-mono text-xs uppercase">
                <div className="border border-line p-3">
                  <p className="text-subtle">Location</p>
                  <p className="mt-1 text-gold-soft">{compactText(profile.location, "Remote / Indonesia")}</p>
                </div>
                <div className="border border-line p-3">
                  <p className="text-subtle">Status</p>
                  <p className="mt-1 text-gold-soft">{profile.isOpenToWork ? "Available" : "Curated"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
