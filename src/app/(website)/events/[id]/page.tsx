export default function eventDetails({ params }: { params: { id: string } }) {
  return <div>{params?.id}</div>;
}
