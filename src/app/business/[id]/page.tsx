import BusinessDetailView from 'src/sections/home/business-detail-view';

export const metadata = {
  title: 'Business Detail',
};

type Props = {
  params: { id: string };
};

export default function BusinessDetailPage({ params }: Props) {
  return <BusinessDetailView businessId={params.id} />;
}
