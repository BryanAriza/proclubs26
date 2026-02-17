import { ClubPage } from '@/components/club-page';

export default function Club({
  params,
}: {
  params: { platform: string; clubId: string };
}) {
  return <ClubPage platform={params.platform} clubId={params.clubId} />;
}
