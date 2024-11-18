import ResumeCard from './ResumeCard/Resumecard';
import resumeData from '../../data/resumeData';

const ResumeContainer = () => {
  return (
    <div className="resume-container grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-5">
        <ResumeCard title="Education" items={resumeData.education} />
        <ResumeCard title="Skills" items={resumeData.skills} />
      </div>
      <div className="flex flex-col gap-5">
        <ResumeCard title="Courses" items={resumeData.courses} />
        <ResumeCard title="Certificates" items={resumeData.certificates} />
      </div>
    </div>
  );
};

export default ResumeContainer;
