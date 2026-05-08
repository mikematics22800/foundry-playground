import { textAnalyticsClient } from "../utils/Foundry";
import AnalysisTestForm from "./AnalysisTestForm";
import { useLanguageContext } from "../context/LanguageContext";

const documents = [
  "Prescribed 100mg ibuprofen, taken twice daily.",
  "Patient does not suffer from high blood pressure."
];
  
const HealthcareEntities = () => {
  const { lan } = useLanguageContext();

  const analyzeHealthcareEntities = async (
    inputDocuments: string[]
  ) => {
    const poller = await textAnalyticsClient.beginAnalyzeHealthcareEntities(inputDocuments);
    const results = await poller.pollUntilDone();
    return results
  }

  return (
    <AnalysisTestForm
      defaultDocuments={documents}
      language={lan}
      onSubmit={analyzeHealthcareEntities}
      description="Identifies healthcare entities including medications, conditions, and procedures."
    />
  )
} 

export default HealthcareEntities