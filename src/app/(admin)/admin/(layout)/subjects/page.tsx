import { SubjectsComponent } from "@/app/(admin)/_components/subjects/subjects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Subjects',
}

const SubjectsPage = () => {
  return (
    <div>
      <SubjectsComponent />
    </div>
  );
}

export default SubjectsPage;