import StudentsViewPage from '../_components/students-view-page';

export const metadata = {
  title: 'Dashboard : Employee View'
};

export default async function Page({
  params
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  return <StudentsViewPage data={Number(studentId)} />;
}
