import QuestionnaireWizard from '../../components/questionnaire/QuestionnaireWizard'

export default function QuestionnairePage() {
  return (
    <div className="flex-1 py-8 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-heading mb-3">
            Find Your Perfect Car
          </h1>
          <p className="text-slate-500 text-lg">
            Answer a few questions and we'll recommend the best cars for you
          </p>
        </div>

        <QuestionnaireWizard />
      </div>
    </div>
  )
}
