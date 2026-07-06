import { mockSubjects } from '../../mock/data'
import SubjectCard from '../components/SubjectCard'

export default function SubjectsPage() {
  return (
    <div className="subjects-page">
      <header className="subjects-page__header">
        <h1 className="text-heading">Dersler</h1>
        <p className="text-caption">
          KPSS Ön Lisans derslerinizi seçin ve konu bazlı çalışmaya başlayın.
        </p>
      </header>

      <div className="subjects-page__grid">
        {mockSubjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  )
}
